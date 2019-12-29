import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class AuditedEntity {
  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;
}
