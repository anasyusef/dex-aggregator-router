import { Token } from "@uniswap/sdk-core";

export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  POLYGON = 137,
  POLYGON_MUMBAI = 80001,
}

export const WRAPPED_NATIVE_CURRENCY: { [chainId in ChainId]: Token } = {
  [ChainId.MAINNET]: new Token(
    1,
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    18,
    "WETH",
    "Wrapped Ether"
  ),
  [ChainId.ROPSTEN]: new Token(
    3,
    "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    18,
    "WETH",
    "Wrapped Ether"
  ),
  [ChainId.POLYGON]: new Token(
    ChainId.POLYGON,
    "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    18,
    "WMATIC",
    "Wrapped MATIC"
  ),
  [ChainId.POLYGON_MUMBAI]: new Token(
    ChainId.POLYGON_MUMBAI,
    "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
    18,
    "WMATIC",
    "Wrapped MATIC"
  ),
};
