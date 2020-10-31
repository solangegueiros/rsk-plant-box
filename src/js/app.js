App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    $.getJSON('../plants.json', function(data) {
      var plantsRow = $('#plantsRow');
      var plantTemplate = $('#plantTemplate');

      for (i = 0; i < data.length; i ++) {
        plantTemplate.find('.panel-title').text(data[i].name);
        plantTemplate.find('img').attr('src', data[i].picture);
        plantTemplate.find('.plant-description').text(data[i].description);        
        plantTemplate.find('.btn-buy').attr('data-id', data[i].id);

        plantsRow.append(plantTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('https://public-node.testnet.rsk.co');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Purchase.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var PurchaseArtifact = data;
      App.contracts.Purchase = TruffleContract(PurchaseArtifact);
    
      // Set the provider for our contract
      App.contracts.Purchase.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the purchased plants
      return App.markPurchased();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-buy', App.handlePurchase);
  },

  markPurchased: function(adopters, account) {
    var plantInstance;

    App.contracts.Purchase.deployed().then(function(instance) {
      plantInstance = instance;

      return plantInstance.getBuyers.call();
    }).then(function(buyers) {
      for (i = 0; i < buyers.length; i++) {
        if (buyers[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-plant').eq(i).find('button').text('Success').attr('disabled', true);
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  handlePurchase: function(event) {
    event.preventDefault();        

    var plantId = parseInt($(event.target).data('id'));

    var purchaseInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Purchase.deployed().then(function(instance) {
        purchaseInstance = instance;

        // Execute adopt as a transaction by sending account
        return purchaseInstance.buy(plantId, {from: account, gasPrice: 59240000});
      }).then(function(result) {
        return App.markPurchased();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
