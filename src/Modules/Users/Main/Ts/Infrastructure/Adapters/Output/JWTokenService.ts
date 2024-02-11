import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { IEncryptionService } from "src/Modules/Users/Main/Ts/Application/Ports/Output/IEncryptionService";
import { IKeyStore } from "src/Modules/Users/Main/Ts/Application/Ports/Output/IKeyStore";
import { ISigningService } from "src/Modules/Users/Main/Ts/Application/Ports/Output/ISigningService";
import { ITokenService } from "src/Modules/Users/Main/Ts/Application/Ports/Output/ITokenService";

@Injectable()
export default class JWTokenService implements ITokenService
{
    private static _SEVEN_DAYS_IN_MILLISECONDS = 604800000;
    private static _ONE_DAY_IN_MILLISECONDS = 86400000;

    public constructor
        (
            @Inject(ISigningService)
            private readonly _signingService: ISigningService,
            @Inject(IEncryptionService)
            private readonly _encryptionService: IEncryptionService,
            @Inject(IKeyStore)
            private readonly _keyStore: IKeyStore
        )
    { }
    public async create(data: string): Promise<{ accessToken: string, refreshToken: string; }>
    {
        const [ keyId, { privateKey, publicKey } ] = await this._keyStore.getActiveKeyPair();

        const signedAccessToken = await this._signingService.sign(data, privateKey);
        const encrypteAccessToken = await this._encryptionService.encrypt(signedAccessToken, publicKey, keyId, JWTokenService._ONE_DAY_IN_MILLISECONDS);

        const signedRefreshToken = await this._signingService.sign(data, privateKey);
        const encrypteRefreshToken = await this._encryptionService.encrypt(signedRefreshToken, publicKey, keyId, JWTokenService._SEVEN_DAYS_IN_MILLISECONDS);

        return { accessToken: encrypteAccessToken, refreshToken: encrypteRefreshToken };
    }
    public async validate(token: string): Promise<string>
    {
        const { ckid, expAt } = this._getMetadata(token);

        if (Date.now() > expAt)
        {
            throw new UnauthorizedException();
        }
        const keyPair = await this._keyStore.getKeyPair(ckid);

        if (!keyPair)
        {
            throw new UnauthorizedException();
        }
        console.log("\n\nencryptedUserData", token, "\n\n");

        const sinedUserData = await this._encryptionService.decrypt(token, keyPair.privateKey);

        console.log("\n\nsinedUserData => ", sinedUserData, "\n\n");

        const userData = await this._signingService.verify(sinedUserData, keyPair.publicKey);

        console.log("\n\nuserData => ", userData, "\n\n");

        return userData;
    }
    private _getMetadata(token: string): { ckid: string, expAt: number; }
    {
        const encodedHeader = token.split(".")[ 0 ];

        const { ckid, expAt } = JSON.parse(Buffer.from(encodedHeader, "base64").toString("utf8")) as { ckid: string, expAt: number; };

        return { ckid, expAt };
    }
}
