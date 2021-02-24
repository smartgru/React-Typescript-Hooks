import {
  InvestmentEmergencyFundPurpose,
  InvestmentLongTermPurpose,
  InvestmentShortTermPurpose,
  InvestmentSubType,
  InvestmentType,
} from './types';

export const investmentEmergencyFundPurposeOptions = [
  {
    value: InvestmentEmergencyFundPurpose.THREE_MONTH_CUSHION,
    label: InvestmentEmergencyFundPurpose.THREE_MONTH_CUSHION,
  },
  {
    value: InvestmentEmergencyFundPurpose.SIX_MONTH_CUSHION,
    label: InvestmentEmergencyFundPurpose.SIX_MONTH_CUSHION,
  },
  {
    value: InvestmentEmergencyFundPurpose.NINE_MONTH_CUSHION,
    label: InvestmentEmergencyFundPurpose.NINE_MONTH_CUSHION,
  },
  {
    value: InvestmentEmergencyFundPurpose.TWELVE_MONTH_CUSHION,
    label: InvestmentEmergencyFundPurpose.TWELVE_MONTH_CUSHION,
  },
];

export const investmentShortTermPurposeOptions = [
  {
    value: InvestmentShortTermPurpose.HOME,
    label: InvestmentShortTermPurpose.HOME,
  },
  {
    value: InvestmentShortTermPurpose.AUTO,
    label: InvestmentShortTermPurpose.AUTO,
  },
  {
    value: InvestmentShortTermPurpose.EDUCATION,
    label: InvestmentShortTermPurpose.EDUCATION,
  },
  {
    value: InvestmentShortTermPurpose.WEDDING,
    label: InvestmentShortTermPurpose.WEDDING,
  },
  {
    value: InvestmentShortTermPurpose.OTHER,
    label: InvestmentShortTermPurpose.OTHER,
  },
];

export const investmentLongTermPurposeOptions = [
  {
    value: InvestmentLongTermPurpose.RETIREMENT,
    label: InvestmentLongTermPurpose.RETIREMENT,
  },
  {
    value: InvestmentLongTermPurpose.CHILD_EDUCATION,
    label: InvestmentLongTermPurpose.CHILD_EDUCATION,
  },
  {
    value: InvestmentLongTermPurpose.OTHER,
    label: InvestmentLongTermPurpose.OTHER,
  },
];

export const getPurposeOptions = (investmentType: InvestmentType | undefined) => {
  switch (investmentType) {
    case 'EF':
      return investmentEmergencyFundPurposeOptions;
    case 'STI':
      return investmentShortTermPurposeOptions;
    case 'LTI':
      return investmentLongTermPurposeOptions;
    default:
      return investmentEmergencyFundPurposeOptions;
  }
};

export const investmentSubTypeOptions = [
  {
    value: InvestmentSubType.SAVINGS_ACCOUNT,
    label: InvestmentSubType.SAVINGS_ACCOUNT,
  },
  {
    value: InvestmentSubType.GIC,
    label: InvestmentSubType.GIC,
  },
  {
    value: InvestmentSubType.ETF,
    label: InvestmentSubType.ETF,
  },
  {
    value: InvestmentSubType.BOND,
    label: InvestmentSubType.BOND,
  },
  {
    value: InvestmentSubType.STOCK,
    label: InvestmentSubType.STOCK,
  },
  {
    value: InvestmentSubType.MUTUAL_FUND,
    label: InvestmentSubType.MUTUAL_FUND,
  },
  {
    value: InvestmentSubType.OTHER,
    label: InvestmentSubType.OTHER,
  },
];
