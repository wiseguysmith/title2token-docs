import type { TransferId } from "@title2token/domain";
import type { TaSignal } from "../types/ta-signals.js";

export interface ITaSignalFeed {
  listSignalsForTransfer(transferId: TransferId): Promise<TaSignal[]>;
}
