import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { IEncryptionService } from "src/Modules/Users/Main/Ts/Application/Ports/Output/IEncryptionService";
import { IKeyStore } from "src/Modules/Users/Main/Ts/Application/Ports/Output/IKeyStore";
import { ISigningService } from "src/Modules/Users/Main/Ts/Application/Ports/Output/ISigningService";
import { ITokenService } from "src/Modules/Users/Main/Ts/Application/Ports/Output/ITokenService";

@Injectable()
export default class JWTokenService implements ITokenService
{
    private static SEVEN_DAYS_IN_MILLISECONDS = 604800000;

    constructor
    (
        @Inject(ISigningService)
        private readonly _signingService: ISigningService,
        @Inject(IEncryptionService)
        private readonly _encryptionService: IEncryptionService,
        @Inject(IKeyStore)
        private readonly _keyStore: IKeyStore
    )
    { }
    async create(data: string): Promise<string>
    {
        const [ keyId, { privateKey, publicKey } ] = await this._keyStore.getActiveKeyPair();

        const signedData = await this._signingService.sign(data, privateKey);

        const encryptedData = await this._encryptionService.encrypt(signedData, publicKey, keyId, JWTokenService.SEVEN_DAYS_IN_MILLISECONDS);

        return encryptedData;
    }
    async validate(token: string): Promise<string>
    {
        const { ckid, expAt } = this.getMetadata(token);

        if (Date.now() > expAt)
        {
            throw new UnauthorizedException();
        }
        const keyPair = await this._keyStore.getKeyPair(ckid);
         
        if (!keyPair)
        {
            throw new UnauthorizedException();
        }
        const sinedUserData = await this._encryptionService.decrypt(token, keyPair.privateKey);

        const userData = await this._signingService.verify(sinedUserData, keyPair.publicKey);

        return userData;
    }
    private getMetadata (token: string)
    {
        const encodedHeader = token.split(".")[0];

        const { ckid, expAt } = JSON.parse(Buffer.from(encodedHeader, "base64").toString("utf8")) as { ckid: string, expAt: number };

        return { ckid, expAt };
    }
}
