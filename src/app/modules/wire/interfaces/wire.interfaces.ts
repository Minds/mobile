export type WireRewardsType =
  'points' |
  'money' |
  'merged';
  // 'bitcoin';

export type WireRewardsTier = {
  amount: number | '',
  description: string,
  type?: string
};

export type WireRewardsTiers = Array<WireRewardsTier>;

export type WireRewardsStruc = {
  description: string,
  rewards: {
    [key in WireRewardsType]: WireRewardsTiers
  }
}

export type WireThresholdStruc = {
  type: WireRewardsType,
  min: number | ''
}
