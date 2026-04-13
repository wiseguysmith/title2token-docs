import type { TransferId } from "@title2token/domain";
import type {
  TaInstructionDispatchRequest,
  TaInstructionDispatchResult,
  TaSignal,
} from "../types/ta-signals.js";

export interface ITransferAgentAdapter {
  readonly adapterName: string;

  sendTransferInstruction(
    request: TaInstructionDispatchRequest,
  ): Promise<TaInstructionDispatchResult>;

  getSignalsForTransfer(transferId: TransferId): Promise<TaSignal[]>;

  getLatestSignalForTransfer(transferId: TransferId): Promise<TaSignal | null>;
}
