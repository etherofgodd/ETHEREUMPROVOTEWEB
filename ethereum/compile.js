const { dirname, resolve } = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const compileContracts = () => {
  const buildPath = resolve(__dirname, "build");
  fs.removeSync(buildPath);

  const provotePath = resolve(__dirname, "contracts", "Provote.sol");
  const source = fs.readFileSync(provotePath, "utf-8");

  let input = {
    language: "Solidity",
    sources: {
      "Provote.sol": {
        content: source,
      },
    },
    settings: {
      optimizer: {
        enabled: true,
      },
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };

  console.log("Begin to compile");

  let output = JSON.parse(solc.compile(JSON.stringify(input)));
  console.log("finished compiling");
  fs.ensureDirSync(buildPath);

  //   console.log("output.contracts :>> ", output.contracts["Provote.sol"]);

  for (let contractName in output.contracts["Provote.sol"]) {
    fs.outputFileSync(
      resolve(buildPath, contractName + ".json"),
      JSON.stringify(output.contracts["Provote.sol"][contractName])
    );
  }
};

compileContracts();
