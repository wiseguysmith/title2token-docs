import type { TaInstructionDispatchRequest, TaInstructionDispatchResult } from "../types/ta-signals.js";

export interface ITaInstructionDispatcher {
  dispatch(request: TaInstructionDispatchRequest): Promise<TaInstructionDispatchResult>;
}
