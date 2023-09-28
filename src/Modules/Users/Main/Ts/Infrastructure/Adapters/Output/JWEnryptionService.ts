import IEnryptionService from "src/Modules/Users/Main/Ts/Application/Ports/Output/IEnryptionService";
import * as jose from "node-jose";

export default class JWEnryptionService implements IEnryptionService
{
    async encrypt(data: string, publicJWK: object): Promise<string>
    {
        return await jose.JWE.createEncrypt({ format: "compact", contentAlg: "A256GCM", fields: { cty: "JWT" } }, publicJWK as any).update(data).final()
    }
    async decrypt(encryptedData: string, privateJWK: object): Promise<string>
    {
        throw new Error("Method not implemented.");
    }
}
