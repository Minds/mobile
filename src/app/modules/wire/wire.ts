import { WireRewardsType } from "./interfaces/wire.interfaces";

type WireTypeLabelsStruc = Array<{ type: WireRewardsType, label: string, icon?: string, mdlIcon?: string }>;

export const WireTypeLabels: WireTypeLabelsStruc = [
  { type: 'points', label: 'Points', mdlIcon: 'bank' },
  { type: 'money', label: '$ USD', icon: 'logo-usd' },
  // { type: 'bitcoin', label: 'Bitcoin' },
];
