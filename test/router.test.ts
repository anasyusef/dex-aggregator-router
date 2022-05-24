import { CurrencyAmount, TradeType } from "@uniswap/sdk-core";
import { Router } from "../src/index";
import { ChainId, WRAPPED_NATIVE_CURRENCY } from "../src/utils/chains";
import { SinonStubbedInstance, createStubInstance } from "sinon";
import { USDC_MAINNET } from "../src/utils/tokens";
import { BaseProvider } from "@ethersproject/providers";

describe("router", () => {
  let mockProvider: SinonStubbedInstance<BaseProvider>;
  let router: Router;

  beforeEach(() => {
    mockProvider = createStubInstance(BaseProvider);
    mockProvider.getBlockNumber.resolves(123456789);
  });
  it("should give a quote for buying USDC", async () => {
    router = new Router({ chainId: 1, provider: mockProvider });
    const amount = CurrencyAmount.fromRawAmount(USDC_MAINNET, 10000);
    await router.route({
      amount,
      quoteCurrency: WRAPPED_NATIVE_CURRENCY[ChainId.MAINNET],
      tradeType: TradeType.EXACT_INPUT,
    });
  });
});
