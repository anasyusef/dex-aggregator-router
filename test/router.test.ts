import { ethers } from "ethers";
import { Router } from "../src/index";

describe("sample", () => {
  const provider = ethers.getDefaultProvider();
  console.log(provider);
  it("should give a quote for buying USDC", () => {
    const route = new Router({ chainId: 1, provider: provider });
  });
});
