import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException, Logger } from "@nestjs/common";
import { Constants } from "../constants/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(JwtStrategy.name);

    constructor() {
        super({ 
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey:'abc123'
        });
    }

    async validate(payload: any) {
        try {
            console.log("payload", payload);
            if (!payload || !payload.sub || !payload.nom) {
                throw new UnauthorizedException('Invalid token payload');
            }
            this.logger.debug(`Validated token payload: ${JSON.stringify(payload)}`);
            return { id: payload.sub, nom: payload.nom  , role : payload.role };
        } catch (error) {
            this.logger.error(`Error validating token: ${error.message}`);
            console.log("payload", payload);
            throw new UnauthorizedException('Unauthorized');
        }
    }
}
