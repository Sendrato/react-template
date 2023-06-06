import { KeyValueString } from '../generated/common';

export interface EntityViolation {
  Error: boolean;
  Message: string;
  Status: string;
  ViolationCodes: string[];
  Violations: KeyValueString;
}
