const fs = require("fs");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const compiledFactory = fs.readFileSync(
  "../ethereum/build/ProvoteFactory.json",
  { encoding: "utf8" }
);

const abi = JSON.parse(compiledFactory).abi;
const bytecode = JSON.parse(compiledFactory).evm.bytecode.object;

const mnemonicPhrase =
  "sweet voice nature inside liberty humor denial captain client tooth fall tide";

let provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase,
  },
  providerOrUrl:
    "https://rinkeby.infura.io/v3/bd938a91c3d347b3b224a856f9b65317",
});

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const deployingAccount = accounts[0];
  const privateKey =
    provider.wallets[deployingAccount.toLowerCase()].privateKey.toString("hex");

  console.log("Attempting to deploy from account: ", accounts[0]);

  try {
    let contract = await new web3.eth.Contract(abi)
      .deploy({
        data: bytecode,
      })
      .encodeABI();

    let transactionObject = {
      gas: 4000000,
      data: contract,
      from: deployingAccount,
    };

    let signedTransactionObject = await web3.eth.accounts.signTransaction(
      transactionObject,
      "0x" + privateKey
    );

    let result = await web3.eth.sendSignedTransaction(
      signedTransactionObject.rawTransaction
    );

    console.log("Contract deployed to :", result.contractAddress);
  } catch (error) {
    console.log(error);
  }

  process.exit();
};

deploy();
