export type ContractClauseLevel = 'danger' | 'caution';

export interface ContractClause {
  level: ContractClauseLevel;
  title: string;
  originalText: string;
  legalIssue: string;
  precedent: string;
  suggestion: string;
}

export interface ContractData {
  toxicClauses: ContractClause[];
  cautionClauses: ContractClause[];
}
