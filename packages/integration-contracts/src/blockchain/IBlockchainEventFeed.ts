import type { OfferingId } from "@title2token/domain";
import type { BlockchainEvent } from "../types/blockchain-events.js";

export interface IBlockchainEventFeed {
  listEventsForOffering(offeringId: OfferingId): Promise<BlockchainEvent[]>;
}
