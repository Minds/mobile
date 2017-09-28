export type Reason = { code: number, label: string };

export const rejectionReasons: Array<Reason> = [
  { code: 0, label: 'Illegal' },
  { code: 1, label: 'Explicit' },
  { code: 2, label: 'Encourages or incites violence' },
  { code: 3, label: 'Threatens, harasses, bullies or encourages others to do so' },
  { code: 4, label: 'Personal and confidential information' },
  { code: 5, label: 'Maliciously targets users (@name, links, images or videos)' },
  { code: 6, label: 'Impersonates someone in a misleading or deceptive manner' },
  { code: 7, label: 'Spam' },
  { code: 8, label: 'Appeals on Boost decisions' }
];