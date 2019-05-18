import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from '../entities/User.entity';

@Service()
export class UserService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  getAllUsers () {
    return this.userRepository.find();
  }
}