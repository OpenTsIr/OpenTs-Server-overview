export const IEnryptionService = Symbol("IEnryptionService");

export default interface IEnryptionService
{
    encrypt(data: string): string;
    decrypt(encryptedData: string): string;
}
