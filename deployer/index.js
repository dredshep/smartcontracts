"use strict";
exports.__esModule = true;
exports.broadcastCodeAsJson = void 0;
var dhive_1 = require("@hiveio/dhive");
var fs_1 = require("fs");
var client = new dhive_1.Client("https://anyx.io" /*{
chainId: "beeab0de00000000000000000000000000000000000000000000000000000000",
}*/);
function broadcastCodeAsJson(contract, account, key) {
    var operation = {
        id: "some_string",
        required_posting_auths: [account],
        required_auths: [],
        json: JSON.stringify(contract)
    };
    console.log(key);
    var privateKey = dhive_1.PrivateKey.fromString(key);
    client.broadcast.json(operation, privateKey).then(console.log, console.error);
}
exports.broadcastCodeAsJson = broadcastCodeAsJson;
// const toBase64 = (str: string) => Buffer.from(str).toString("base64");
// fs already reads as base64 by default, but it may be bad practice to rely on this in the future.
// Better, perhaps, to use fs.readFileSync(path, "utf-8") and then bufferize it?
// I will rely on default for now.
var sampleCode = fs_1.readFileSync("./sampleCode.js");
var sampleContract = {
    contractName: "contract",
    contractAction: "deploy",
    contractPayload: {
        name: "smart-contact-name",
        code: sampleCode.toString("base64")
    }
};
var key = fs_1.readFileSync("./posting.txt", "utf-8");
broadcastCodeAsJson(sampleContract, "dredshep", key);
