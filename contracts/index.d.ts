// entry should be adapted to Mongo models.

interface Database {
  insert: (model: string, entry: { [key: string]: any }) => any;
}

// https://github.com/hive-engine/steemsmartcontracts-wiki/blob/master/Smart-Contracts-API.md
declare namespace api {
  let sender: string;
  let owner: string;
  let db: Database;
  let contractVersion: number;

  function executeSmartContract(
    contract: string,
    action: string,
    jsonPayload: string
  ): any;

  function executeSmartContractAsOwner(
    contract: string,
    action: string,
    jsonPayload: string
  ): any;

  function transferTokens(
    to: string,
    symbol: string,
    quantity: number,
    type: "user" | "contract"
  ): any;

  function random(): number;
}

// These are hypotheticals. Any action
type action = (jsonPayload: string) => any;
type actions = {
  [key: string]: action;
};

declare const actions: actions;
