import { BaseProvider } from "@ethersproject/providers";
import {
  TradeType,
  CurrencyAmount,
  Currency,
  Fraction,
} from "@uniswap/sdk-core";
import { ChainId } from "./utils/chains";
import { merge } from "lodash";

export type RouterParams = {
  chainId: ChainId;
  provider: BaseProvider;
  distributionPercent?: number;
};

export interface RouterConfig {
  distributionPercent: number;
}

export interface RouteConfig {
  amount: CurrencyAmount<Currency>;
  quoteCurrency: Currency;
  tradeType: TradeType;
  config?: Partial<RouterConfig>;
}

const DEFAULT_CONFIG: RouterConfig = {
  distributionPercent: 5,
};

export class Router {
  protected chainId: ChainId;
  protected provider: BaseProvider;
  constructor({ chainId, provider }: RouterParams) {
    this.chainId = chainId;
    this.provider = provider;
  }

  public async route({
    amount,
    quoteCurrency,
    tradeType,
    config,
  }: RouteConfig) {
    const blockNumber = await this.provider.getBlockNumber();
    console.log({ blockNumber });

    const currencyIn =
      tradeType === TradeType.EXACT_INPUT ? amount.currency : quoteCurrency;
    const currencyOut =
      tradeType === TradeType.EXACT_INPUT ? quoteCurrency : amount.currency;

    const tokenIn = currencyIn.wrapped;
    const tokenOut = currencyOut.wrapped;

    const routingConfig: RouterConfig = merge({}, config, DEFAULT_CONFIG);

    // Generate our distribution of amounts, i.e. fractions of the input amount.
    // We will get quotes for fractions of the input amount for different routes, then
    // combine to generate split routes.
    const [percents, amounts] = this.getAmountDistribution(
      amount,
      routingConfig
    );


    const quoteToken = quoteCurrency.wrapped

    const quotePromises = [];
  }

  // Note multiplications here can result in a loss of precision in the amounts (e.g. taking 50% of 101)
  // This is reconciled at the end of the algorithm by adding any lost precision to one of
  // the splits in the route.
  private getAmountDistribution(
    amount: CurrencyAmount<Currency>,
    routingConfig: RouterConfig
  ): [number[], CurrencyAmount<Currency>[]] {
    const { distributionPercent } = routingConfig;
    const percents = [];
    const amounts = [];

    for (let i = 1; i <= 100 / distributionPercent; i++) {
      percents.push(i * distributionPercent);
      amounts.push(amount.multiply(new Fraction(i * distributionPercent, 100)));
    }

    return [percents, amounts];
  }
}
