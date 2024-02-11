import * as jose from "node-jose";
import { Injectable } from "@nestjs/common";
import { IEncryptionService } from "src/Modules/Users/Main/Ts/Application/Ports/Output/IEncryptionService";
import { JWK } from "node-jose";

@Injectable()
export default class JWEncryptionService implements IEncryptionService
{
    public async encrypt(data: string, publicJWK: Awaited<Promise<ReturnType<typeof JWK.asKey>>>, kid: string, expirationTimeInMilliseconds: number): Promise<string>
    {
        return await jose.JWE.createEncrypt
            (
                {
                    format: "compact",
                    contentAlg: "A256GCM",
                    fields:
                    {
                        cty: "JWT",
                        ckid: kid,
                        expAt: (Date.now() * expirationTimeInMilliseconds)
                    },
                },
                publicJWK
            )
            .update(data)
            .final();
    }
    public async decrypt(encryptedData: string, privateJWK: Awaited<Promise<ReturnType<typeof JWK.asKey>>>): Promise<string>
    {
        const decryptionResult = await jose.JWE.createDecrypt(privateJWK as never).decrypt(encryptedData);

        return decryptionResult.payload.toString();
    }
}
