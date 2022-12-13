import TronWeb from "tronweb";

const configTron = {
  fullNode: "https://api.nileex.io",
  solidityNode: "https://api.nileex.io",
  eventServer: "https://api.nileex.io",
};

export const tronweb = new TronWeb(
  configTron.fullNode,
  configTron.solidityNode,
  configTron.eventServer
);
