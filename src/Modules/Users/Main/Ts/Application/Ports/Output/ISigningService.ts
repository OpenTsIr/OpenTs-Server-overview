export const ISigningService = Symbol("ISigningService");
export default interface ISigningService
{
    sign(data: string, privateJWK: object): Promise<string>;
    verify(token: string, publicJWK: object): Promise<string>;
}
