import * as crypto from 'crypto';

export class Constants {
  private static JWT_SECRET = crypto.randomBytes(32).toString('hex');

  public static getJWTSecret(): string {
    return Constants.JWT_SECRET;
  }
}
