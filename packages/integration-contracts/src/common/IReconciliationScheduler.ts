export interface IReconciliationScheduler {
  schedule(): Promise<void>;
}
