import { Repository, Entity, EntityRepository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getByUsername(username: string): Promise<User> {
    return await this.findOne({ username });
  }
}
