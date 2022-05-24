import { Token } from "@uniswap/sdk-core";
import { ChainId } from "./chains";

// Some well known tokens on each chain for seeding cache / testing.
export const USDC_MAINNET = new Token(
  ChainId.MAINNET,
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  6,
  "USDC",
  "USD//C"
);
export const USDT_MAINNET = new Token(
  ChainId.MAINNET,
  "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  6,
  "USDT",
  "Tether USD"
);
export const WBTC_MAINNET = new Token(
  ChainId.MAINNET,
  "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  8,
  "WBTC",
  "Wrapped BTC"
);
