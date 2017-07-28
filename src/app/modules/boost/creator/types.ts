export type CurrencyType = 'points' | 'usd' | 'btc';
export type BoostType = 'p2p' | 'newsfeed' | 'content';
export type Category = { id: string; label: string };

export interface BoostStruc {
  amount: number,
  currency: CurrencyType,
  type: BoostType,

  categories: string[],
  priority: boolean,

  target: any,
  scheduledTs: number,
  postToFacebook: boolean,

  nonce: string
}

export class VisibleBoostError extends Error {
  visible: boolean = true;
}