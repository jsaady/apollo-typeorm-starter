import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from 'typeorm-typedi-extensions';
import { RefreshToken } from "../entities/RefreshToken.entity";

@Service()
export class RefreshTokenService {
  constructor (
    @InjectRepository(RefreshToken)
    private readonly refreshRepository: Repository<RefreshToken>
  ) { }

  async issueRefreshToken (
    userId: number,
    clientIdentifier: string
  ) {
    await this.revoke(userId, clientIdentifier);

    const token = await this.refreshRepository.create({
      userId,
      clientIdentifier,
      expiration: new Date(Date.now() + 30 * 60 * 1000) // TODO: utilize a config
    });

    return this.refreshRepository.save(token);
  }

  async revoke(userId: number, clientIdentifier: string) {
    await this.refreshRepository.delete({
      userId,
      clientIdentifier
    });
  }

  async tokenIsValid (
    refreshToken: string,
    clientIdentifier: string
  ) {
    const existingToken = await this.refreshRepository.findOne({
      refreshToken,
      clientIdentifier
    });

    if (!!existingToken && (existingToken.expiration > new Date())) {
      return existingToken;
    }

    return null;
  }
}