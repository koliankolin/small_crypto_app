import { provider } from "web3-core";
import { MetaMaskInpageProvider } from "@metamask/providers";
import Web3 from "web3";

export type apiProvider = provider | MetaMaskInpageProvider

declare global {
  interface Window {
    ethereum: apiProvider;
    web3: Web3
  }
}