# RSK Truffle Plant Box

Truffle box configured to create a complete dApp using Truffle framework connected to RSK Networks, including a frontend.

## Requirements

1. [NPM (Node Package Manager)](https://nodejs.org/en/) and 
Node.js are needed, though both are usually installed at once.

Go to [Node.js](https://nodejs.org/en/) if you need to install it.

2. Truffle

Install Truffle globally:

```shell
npm install -g truffle
```

Go to the tutorial [Truffle boxes prerequisites](https://developers.rsk.co/tutorials/truffle-boxes/truffle-boxes-prerequisites/) to have all requirements steps with more details, explanations, and images.

## Installation

1. Create a new folder. 
For example, create the folder `rsk-plant`.
Navigate to the folder in the terminal.

```shell
mkdir rsk-plant
cd rsk-plant
```

2. Run the unbox command. 
This also takes care of installing the necessary dependencies and it can take some time.

```shell
truffle unbox rsksmart/rsk-plant-box
```

This is the result using Windows OS:

![truffle unbox](/images/image-01.png)

## Development console

Truffle has an interactive console that also spawns a development blockchain. This is very useful for compiling, deploying and testing locally.

3. Run the development console. This command is successful if you see a list of 10 accounts, a mnemonic and the command prompt is now `truffle(develop)>`

```shell
truffle develop
```

You will now be in the truffle develop console with seeded accounts and their associated private keys listed.

```txt
C:\RSK\rsk-plant>truffle develop

Truffle Develop started at http://127.0.0.1:8545/

Accounts:
(0) 0x1056f747cf4bc7710e178b2aeed4eb8c8506c728
(1) 0x45a71c00382c2898b5d6fae69a6f7bfe6edab80c
(2) 0x1596384706dc9ac4cca7f50279a4abe591d6c3fe
(3) 0x9576d0a496b645baa64f22aceb2328e7468d4113
(4) 0xd431572eef7d77584d944c1809398a155e89f830
(5) 0x92c111839718fe0800fadccc67068b40b8524a0f
(6) 0x6da22b5a027146619bfe6704957f7f36ff029c48
(7) 0x2c3a82d8c3993f8c80dcaf91025437bd057df867
(8) 0xc43ae7a44f7deb759177b7093f06512a0a9ff5d7
(9) 0xe61bf00cd7dce248449cfe58f23a4ef7d542bc0b

Private Keys:
(0) f32f32839fe27ad906b63eafb326f26fed95c231e3c5e33c7cdd08f62db63167
(1) ebef990088f27f6ef13b5e52a77d5dcc5a76862a701908c586d01b6fe93562b3
(2) 598ccae5e4436fedeb0e798c0d254789c55a63401ebfc3ae8ddde29634ddfcde
(3) 09934b80f391e0024b8cb00cd73790fdf64c4d0509e144766414fee317cd3f4e
(4) ac745b84b6574b5738d364b43e0d471c9d5107504acc709c90f6f091b78c751b
(5) 449654cde095f2349113ef12a93e139b4302bc95adb3619d08adf53dde9b8847
(6) c217f12a89c352fc70b5f1bd5742314b4fb1bb1e35cb779fdb3c2390106355db
(7) 1d4c74dfa4e99e161130c18cc63938bb120a128cefbf1b9188efc678bf5722cb
(8) 0f44e0becf2e090db498a1b747d2a758fcc81fb0241f350d61117a9c6b1fa82e
(9) 85218c5eec657470dafeb09e6f7101f91d21bfe822fbeeecfc9275f798662a63

Mnemonic: virtual valve razor retreat either turn possible student grief engage attract fiber

⚠️  Important ⚠️  : This mnemonic was created for you by Truffle. It is not secure.
Ensure you do not use it on production blockchains, or else you risk losing funds.

truffle(develop)>
```

## PlantShop.sol

Take a look at the smart contract `PlantShop.sol`. You can check it out in folder `contracts`.

![PlantShop.sol](/images/image-02.png)

This smart contract has:

* A variable `buyers` to store an array with 16 posisions to store addresses
* A function `getBuyers` to return the list of addresses stored at variable `buyers`
* A function `buy` to update an address at variable `buyers`, in the number of position sent as parameter

5. Compile and migrate the smart contract. 
Note inside the development console we don't preface commands with `truffle`.

> To make sure you're in the development console, the command prompt must be `truffle(develop)>`

```shell
compile
```

The `compile output` should be similar to:

![truffle compile](/images/image-03.png)

```shell
migrate
```

And the `migrate output` should be similar to:

![truffle migrate](/images/image-04.png)

6. Running contract tests.

This Truffle box also comes with the file `TestPlantShop.js` which include some examples for testing the smart contract. 
You can check it out in the `test` folder.

Run this command in the development console:

```shell
test
```

This `test output` should be similar to:

![truffle test](/images/image-05.png)

Note the command varies slightly if you're in or outside of the development console.

```javascript
// inside the development console.
test

// outside the development console.
truffle test
```

