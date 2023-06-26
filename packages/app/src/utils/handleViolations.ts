export interface Violations {
  Violations?: Record<string, string> | string;
  ViolationCodes?: string[];
  Violation?: string;
}

export const handleViolations = ({
  Violation,
  ViolationCodes,
  Violations,
}: Violations): string | null => {
  if (Violation) {
    return Violation;
  }

  if (typeof Violations === 'string') {
    return Violations;
  }

  if (Violations && ViolationCodes) {
    return Violations[ViolationCodes[0]];
  }

  return null;
};
