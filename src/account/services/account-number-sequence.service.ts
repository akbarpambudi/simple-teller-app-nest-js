import { Injectable } from '@nestjs/common';
import { AccountNumberGenerator } from './interfaces';
import { AccountNumberSequenceRepository } from '../repository/account-number-sequence.repository';
import { AccountNumberSequence } from './../entities/account-number-sequence.entity';

const BANK_CODE = '1273300';

@Injectable()
export class AccountNumberSequenceService implements AccountNumberGenerator {
  constructor(private repository: AccountNumberSequenceRepository) {}

  async next(): Promise<string> {
    let sequence = await this.repository.findOne({ prefix: BANK_CODE });
    if (sequence == null) {
      sequence = this.createDefaultAccountNumberSequence();
    }
    const accountNumber = this.generateAccountNumberFromSequence(sequence);
    sequence.sequenceNumber++;
    await this.repository.save(sequence);
    return accountNumber;
  }

  private generateAccountNumberFromSequence(sequence: AccountNumberSequence) {
    const characterLength = sequence.totalLength - sequence.prefix.length;
    const runningNumberInFixedLength = (sequence.sequenceNumber + '').padStart(
      characterLength,
      '0',
    );
    const generatedAccountNumber = sequence.prefix + runningNumberInFixedLength;
    return generatedAccountNumber;
  }

  private createDefaultAccountNumberSequence() {
    const sequence = new AccountNumberSequence();
    sequence.prefix = BANK_CODE;
    sequence.sequenceNumber = 1;
    sequence.totalLength = 16;
    return sequence;
  }
}
