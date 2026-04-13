import type { TransferId } from "@title2token/domain";
import type { TaSignal } from "../types/ta-signals.js";

export interface ITaRecordLookup {
  lookupRecordedState(transferId: TransferId): Promise<TaSignal | null>;
}
