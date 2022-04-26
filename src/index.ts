import { BaseProvider } from "@ethersproject/providers";
import { TradeType, Token, CurrencyAmount, Currency } from "@uniswap/sdk-core";
import { ChainId } from "./utils/chains";

export type RouterParams = {
  chainId: ChainId;
  provider: BaseProvider;
};

export interface RouteConfig {
  amount: CurrencyAmount<Currency>;
  quoteCurrency: Currency;
  tradeType: TradeType;
}

export class Router {
  protected chainId: ChainId;
  protected provider: BaseProvider;
  constructor({ chainId, provider }: RouterParams) {
    this.chainId = chainId;
    this.provider = provider;
  }

  public async route({ amount, quoteCurrency, tradeType }: RouteConfig) {
    const blockNumber = await this.provider.getBlockNumber();

    const currencyIn =
      tradeType === TradeType.EXACT_INPUT ? amount.currency : quoteCurrency;
    const currencyOut =
      tradeType === TradeType.EXACT_INPUT ? quoteCurrency : amount.currency;

    const tokenIn = currencyIn.wrapped;
    const tokenOut = currencyOut.wrapped;

    console.log({ tokenIn, tokenOut });
  }
}
