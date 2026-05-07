// Recovery calculator logic

export interface RecoveryInput {
  portfolioSize: number;     // AED
  dpdBucket: '30-89' | '90-179' | '180-365' | '365+';
  sector: 'telecom' | 'banking' | 'retail' | 'healthcare' | 'logistics' | 'other';
}

export interface RecoveryOutput {
  estimatedRecovery: number;
  recoveryRate: number;
  timelineMonths: number;
  projectedROI: number;
}

const RATE_MATRIX: Record<RecoveryInput['dpdBucket'], Record<RecoveryInput['sector'], number>> = {
  '30-89':   { telecom: 0.93, banking: 0.91, retail: 0.89, healthcare: 0.87, logistics: 0.90, other: 0.88 },
  '90-179':  { telecom: 0.85, banking: 0.83, retail: 0.80, healthcare: 0.79, logistics: 0.82, other: 0.78 },
  '180-365': { telecom: 0.74, banking: 0.72, retail: 0.68, healthcare: 0.66, logistics: 0.70, other: 0.65 },
  '365+':    { telecom: 0.58, banking: 0.55, retail: 0.50, healthcare: 0.48, logistics: 0.52, other: 0.45 },
};

const TIMELINE_MONTHS: Record<RecoveryInput['dpdBucket'], number> = {
  '30-89': 3, '90-179': 5, '180-365': 8, '365+': 12,
};

const SPM_FEE_RATE = 0.12; // 12% contingency fee (illustrative)

export function calculateRecovery(input: RecoveryInput): RecoveryOutput {
  const recoveryRate = RATE_MATRIX[input.dpdBucket][input.sector];
  const estimatedRecovery = Math.round(input.portfolioSize * recoveryRate);
  const timelineMonths = TIMELINE_MONTHS[input.dpdBucket];
  const fee = estimatedRecovery * SPM_FEE_RATE;
  const netRecovery = estimatedRecovery - fee;
  const projectedROI = Math.round((netRecovery / input.portfolioSize) * 100);

  return { estimatedRecovery, recoveryRate, timelineMonths, projectedROI };
}
