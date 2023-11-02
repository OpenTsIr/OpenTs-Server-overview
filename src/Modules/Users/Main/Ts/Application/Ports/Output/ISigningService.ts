import { JWK } from "node-jose";

export const ISigningService = Symbol("ISigningService").valueOf();
export interface ISigningService
{
    sign(data: string, privateJWK: Awaited<ReturnType<typeof JWK.asKey>>): Promise<string>;
    verify(token: string, publicJWK: Awaited<ReturnType<typeof JWK.asKey>>): Promise<string>;
}
