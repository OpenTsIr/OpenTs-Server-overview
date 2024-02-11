import JWEncryptionService from "src/Modules/Users/Main/Ts/Infrastructure/Adapters/Output/JWEncryptionService";
import JWKeyStore from "src/Modules/Users/Main/Ts/Infrastructure/Adapters/Output/JWKeyStore";
import JWSigningService from "src/Modules/Users/Main/Ts/Infrastructure/Adapters/Output/JWSigningService";

describe('SigningService', () =>
{
    let keyStore: JWKeyStore = null;

    beforeAll(async () =>
    {
        keyStore = new JWKeyStore();
    });
    it('should encrypt and decrypt a signed message', async () =>
    {
        // Build
        const signingService = new JWSigningService();
        const encryptionService = new JWEncryptionService();

        const [ keyId, { privateKey, publicKey } ] = await keyStore.getActiveKeyPair();

        const data = 'Hello, World!';

        // Operate
        const signedData = await signingService.sign(data, privateKey);
        const encryptSignedData = await encryptionService.encrypt(signedData, publicKey, keyId, 36000);

        const key = await keyStore.getKeyPair(keyId);

        const decryptedToken = await encryptionService.decrypt(encryptSignedData, key.privateKey);
        const verifiedData = await signingService.verify(decryptedToken, key.publicKey);

        // Check
        expect(verifiedData).toBe(data);
    });
});
