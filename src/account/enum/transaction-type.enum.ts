export enum TransactionType {
  DEBIT,
  CREDIT,
}

export class TransactionTypeUtil {
  public static fromString(type: string): TransactionType {
    switch (type.toLowerCase()) {
      case 'debit':
        return TransactionType.DEBIT;
      case 'credit':
        return TransactionType.CREDIT;
    }
    return null;
  }
}
