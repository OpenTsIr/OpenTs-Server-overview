import { JWK, JWS } from "node-jose";
import { Injectable } from "@nestjs/common";
import { ISigningService } from "src/Modules/Users/Main/Ts/Application/Ports/Output/ISigningService";

@Injectable()
export default class JWSigningService implements ISigningService
{
    public async sign(data: string, privateJWK: Awaited<Promise<ReturnType<typeof JWK.asKey>>>): Promise<string>
    {
        return await JWS.createSign({ format: "compact" }, privateJWK).update(data).final() as unknown as string;
    }
    public async verify(token: string, publicJWK: Awaited<Promise<ReturnType<typeof JWK.asKey>>>): Promise<string>
    {
        const verificationResult = await JWS.createVerify(publicJWK).verify(token);

        return verificationResult.payload.toString();
    }
}
