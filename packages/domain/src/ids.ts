type Brand<K, T extends string> = K & { readonly __brand: T };

export type OfferingId = Brand<string, "OfferingId">;
export type InvestorId = Brand<string, "InvestorId">;
export type TransferId = Brand<string, "TransferId">;
export type WalletId = Brand<string, "WalletId">;
export type ExternalReferenceId = Brand<string, "ExternalReferenceId">;

export const asOfferingId = (value: string): OfferingId => value as OfferingId;
export const asInvestorId = (value: string): InvestorId => value as InvestorId;
export const asTransferId = (value: string): TransferId => value as TransferId;
export const asWalletId = (value: string): WalletId => value as WalletId;
export const asExternalReferenceId = (value: string): ExternalReferenceId =>
  value as ExternalReferenceId;
