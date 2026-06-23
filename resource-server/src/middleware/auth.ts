import { expressjwt } from "express-jwt";
import jwksRsa from "jwks-rsa";

export const jwtCheck = expressjwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksUri:
            "http://localhost:8080/realms/moviehub/protocol/openid-connect/certs",
    }) as any,

    audience: "account",
    issuer: "http://localhost:8080/realms/moviehub",
    algorithms: ["RS256"],
});