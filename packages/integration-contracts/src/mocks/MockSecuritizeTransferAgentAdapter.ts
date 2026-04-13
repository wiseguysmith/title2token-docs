import type { TransferId } from "@title2token/domain";
import type { ISecuritizeTransferAgentAdapter } from "../securitize/ISecuritizeTransferAgentAdapter.js";
import type {
  TaInstructionDispatchRequest,
  TaInstructionDispatchResult,
  TaSignal,
} from "../types/ta-signals.js";

export class MockSecuritizeTransferAgentAdapter implements ISecuritizeTransferAgentAdapter {
  private readonly signals = new Map<TransferId, TaSignal>();

  async sendInstruction(
    request: TaInstructionDispatchRequest,
  ): Promise<TaInstructionDispatchResult> {
    return {
      accepted: true,
      dispatchedAt: request.dispatchedAt,
      externalReferenceId: request.payloadReferenceId,
    };
  }

  async getLatestSignal(transferId: TransferId): Promise<TaSignal | null> {
    return this.signals.get(transferId) ?? null;
  }
}
