export class FakeShopSuspiciousCheckDto {
  url: string;
}

export type FakeShopSuspiciousCheckResult = {
  suspicious: boolean;
  totalCount: number;
  timeLastReport: Date | null;
  timeFirstReport: Date | null;
};
