import type { IPolicyResolver } from "../common/IPolicyResolver.js";

export class NoopPolicyResolver<TInput = unknown, TOutput = unknown>
  implements IPolicyResolver<TInput, TOutput | null>
{
  async resolve(_input: TInput): Promise<TOutput | null> {
    return null;
  }
}
