import type { TransferId } from "@title2token/domain";
import type { ITaSignalFeed } from "../securitize/ITaSignalFeed.js";
import type { TaSignal } from "../types/ta-signals.js";

export class MockTaSignalFeed implements ITaSignalFeed {
  async listSignalsForTransfer(_transferId: TransferId): Promise<TaSignal[]> {
    return [];
  }
}
