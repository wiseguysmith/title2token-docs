export interface IPolicyResolver<TInput = unknown, TOutput = unknown> {
  resolve(input: TInput): Promise<TOutput>;
}
