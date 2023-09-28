import ISigningService from "src/Modules/Users/Main/Ts/Application/Ports/Output/ISigningService";
import * as jose from "node-jose";

export default class JWSigningService implements ISigningService
{
    async sign(data: string, privateJWK: object): Promise<string>
    {
        return await jose.JWS.createSign({ format: "compact" }, privateJWK as any).update(data).final() as unknown as string
    }
    async verify(token: string, publicJWK: object): Promise<string>
    {
        return await jose.JWS.createVerify(publicJWK).verify(token) as unknown as string;
    }
}
