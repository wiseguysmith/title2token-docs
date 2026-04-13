import type { IReconciliationScheduler } from "../common/IReconciliationScheduler.js";

export class StubReconciliationScheduler implements IReconciliationScheduler {
  async schedule(): Promise<void> {
    return;
  }
}
