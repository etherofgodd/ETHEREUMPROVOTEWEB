const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const fs = require("fs");

const provider = ganache.provider();
const web3 = new Web3(provider);

const compiledFactory = fs.readFileSync(
  "./ethereum/build/ProvoteFactory.json",
  { encoding: "utf8" }
);

const compiledProvote = fs.readFileSync("./ethereum/build/Provote.json", {
  encoding: "utf8",
});

let accounts;
let factory;
let provote;
let provoteAddress;

beforeEach(async () => {
  // This gets the various accounts in ganache
  accounts = await web3.eth.getAccounts();

  //   let balance = await web3.eth.getBalance(accounts[0]); // checks if there is money

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory).abi)
    .deploy({
      data: JSON.parse(compiledFactory).evm.bytecode.object,
    })
    .send({
      from: accounts[0],
      gas: 6721975,
      gasPrice: "1000000",
    });

  await factory.methods
    .createProvote(["Andrew", "Samuel", "Toby"], "PRESIDENTIAL ELECTIONS")
    .send({
      from: accounts[0],
      gas: 6721975,
      gasPrice: "1000000",
    });

  [provoteAddress] = await factory.methods.getDeployedElections().call();

  provote = await new web3.eth.Contract(
    JSON.parse(compiledProvote).abi,
    provoteAddress
  );
});

describe("Provote", () => {
  it("Should deploy a factory and a provoteinstace", () => {
    assert.ok(factory.options.address);
    console.log("factory addy" + factory.options.address);
    assert.ok(provote.options.address);
    console.log("Provote addy" + provote.options.address);
  });

  it("Marks the caller as the provote official", async () => {
    let official = await provote.methods.INECPERSONNEL().call();
    assert.strictEqual(accounts[0], official);
  });

  it("Should register a voter", async () => {
    const isRegistered = await provote.methods.registerVoter(accounts[1]).send({
      from: accounts[0],
      gas: 6721975,
      gasPrice: "1000000",
    });

    assert.ok(isRegistered);
  });

  it("Should not register a voter if not INECPERSONNEL", async () => {
    try {
      await provote.methods.registerVoter(accounts[1]).send({
        from: accounts[1],
        gas: 6721975,
        gasPrice: "1000000",
      });
      assert(false);
    } catch (error) {
      assert(error);
    }
  });

  it("Should not allow people to vote after campaign has ended", async () => {
    try {
      await provote.methods.endCampaign().send({
        from: accounts[0],
        gas: 6721975,
        gasPrice: "1000000",
      });

      await provote.methods.registerVoter(accounts[1]).send({
        from: accounts[0],
        gas: 6721975,
        gasPrice: "1000000",
      });

      assert(false);
    } catch (error) {
      assert(error);
    }
  });

  it("Should fail if right to vote is already true", async () => {
    await provote.methods.registerVoter(accounts[1]).send({
      from: accounts[0],
      gas: 6721975,
      gasPrice: "1000000",
    });
    try {
      await provote.methods.registerVoter(accounts[1]).send({
        from: accounts[0],
        gas: 6721975,
        gasPrice: "1000000",
      });
      assert(false);
    } catch (error) {
      assert(error);
    }
  });

  it("Should not allow user to vote on campaign day", async () => {
    await provote.methods.registerVoter(accounts[1]).send({
      from: accounts[0],
      gas: 6721975,
      gasPrice: "1000000",
    });
    try {
      await provote.methods.vote(1).send({
        from: accounts[1],
        gas: 6721975,
        gasPrice: "1000000",
      });

      assert(false);
    } catch (error) {
      assert(error);
    }
  });

  it("Should not allow unregistered users vote", async () => {
    await provote.methods.endCampaign().send({
      from: accounts[0],
      gas: 6721975,
      gasPrice: "1000000",
    });

    try {
      await provote.methods.vote(1).send({
        from: accounts[1],
        gas: 6721975,
        gasPrice: "1000000",
      });

      assert(false);
    } catch (error) {
      console.log(error.results);
      assert(error);
    }
  });

  it("Should allow user vote", async () => {
    await provote.methods.registerVoter(accounts[1]).send({
      from: accounts[0],
      gas: 6721975,
      gasPrice: "1000000",
    });

    await provote.methods.endCampaign().send({
      from: accounts[0],
      gas: 6721975,
      gasPrice: "1000000",
    });

    let voted = await provote.methods.vote(1).send({
      from: accounts[1],
      gas: 6721975,
      gasPrice: "1000000",
    });

    assert.ok(voted);
  });
});
