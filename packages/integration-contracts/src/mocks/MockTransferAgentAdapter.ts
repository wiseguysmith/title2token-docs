import type { TransferId } from "@title2token/domain";
import type { ITransferAgentAdapter } from "../adapters/ITransferAgentAdapter.js";
import type {
  TaInstructionDispatchRequest,
  TaInstructionDispatchResult,
  TaSignal,
} from "../types/ta-signals.js";

export class MockTransferAgentAdapter implements ITransferAgentAdapter {
  readonly adapterName = "MockTransferAgentAdapter";

  private readonly signalsByTransfer = new Map<TransferId, TaSignal[]>();

  async sendTransferInstruction(
    request: TaInstructionDispatchRequest,
  ): Promise<TaInstructionDispatchResult> {
    return {
      accepted: true,
      dispatchedAt: request.dispatchedAt,
      externalReferenceId: request.payloadReferenceId,
      message: "Instruction accepted by mock transfer agent adapter.",
    };
  }

  async getSignalsForTransfer(transferId: TransferId): Promise<TaSignal[]> {
    return [...(this.signalsByTransfer.get(transferId) ?? [])];
  }

  async getLatestSignalForTransfer(transferId: TransferId): Promise<TaSignal | null> {
    const signals = this.signalsByTransfer.get(transferId) ?? [];
    return signals.at(-1) ?? null;
  }

  pushSignal(signal: TaSignal): void {
    const current = this.signalsByTransfer.get(signal.transferId) ?? [];
    current.push(signal);
    this.signalsByTransfer.set(signal.transferId, current);
  }
}
