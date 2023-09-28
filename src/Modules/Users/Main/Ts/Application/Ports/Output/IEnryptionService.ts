export const IEnryptionService = Symbol("IEnryptionService");
export default interface IEnryptionService
{
    encrypt(data: string, publicJWK: object): Promise<string>;
    decrypt(encryptedData: string, privateJWK: object): Promise<string>;
}
