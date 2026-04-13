import type { TransferId } from "@title2token/domain";
import type {
  TaInstructionDispatchRequest,
  TaInstructionDispatchResult,
  TaSignal,
} from "../types/ta-signals.js";

export interface ISecuritizeTransferAgentAdapter {
  sendInstruction(
    request: TaInstructionDispatchRequest,
  ): Promise<TaInstructionDispatchResult>;
  getLatestSignal(transferId: TransferId): Promise<TaSignal | null>;
}
