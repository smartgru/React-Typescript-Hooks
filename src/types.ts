import * as H from 'history';

export interface AppLocationState {
  background: H.Location;
}

export interface BetterRatesItem {
  institution: string;
  type: string;
  rate: number;
}

export type BetterRates = BetterRatesItem[];
