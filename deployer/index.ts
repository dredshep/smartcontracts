import { Client, PrivateKey } from "@hiveio/dhive";
import { readFileSync } from "fs";
const client = new Client("https://anyx.io");

type Operation = {
  required_auths: string[];
  required_posting_auths: string[];
  id: string;
  json: string;
};

export function broadcastCodeAsJson(
  contract: ContractDeployObject,
  account: string,
  key: string
) {
  const operation: Operation = {
    id: "some_string",
    required_posting_auths: [account],
    required_auths: [],
    json: JSON.stringify(contract),
  };
  console.log(key);
  const privateKey = PrivateKey.fromString(key);
  client.broadcast.json(operation, privateKey).then(console.log, console.error);
}

// const toBase64 = (str: string) => Buffer.from(str).toString("base64");
// fs already reads as base64 by default, but it may be bad practice to rely on this in the future.
// Better, perhaps, to use fs.readFileSync(path, "utf-8") and then bufferize it?
// I will rely on default for now.
const sampleCode = readFileSync("./sampleCode.js");

type ContractDeployObject = {
  contractName: "contract";
  contractAction: "deploy";
  contractPayload: {
    name: string;
    code: string;
  };
};

const sampleContract: ContractDeployObject = {
  contractName: "contract",
  contractAction: "deploy",
  contractPayload: {
    name: "smart-contact-name",
    code: sampleCode.toString("base64"),
  },
};

const key = readFileSync("./posting.txt", "utf-8");

broadcastCodeAsJson(sampleContract, "dredshep", key);
