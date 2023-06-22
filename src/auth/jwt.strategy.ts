import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtSecret } from 'src/utils/constants';
import { Request } from 'express';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                jwtStrategy.extractJWT,

            ]),
            secretOrKey: jwtSecret
        });
    }


    private static extractJWT(req: Request): string | null {

        if (req.cookies && 'token' in req.cookies) {
            return req.cookies.token;
        }

        return null
    }

    async validate(payload: { id: number, user: string, role: number }) {

        return payload;
    }
}