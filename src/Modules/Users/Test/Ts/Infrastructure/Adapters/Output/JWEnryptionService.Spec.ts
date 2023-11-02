import JWEncryptionService from "src/Modules/Users/Main/Ts/Infrastructure/Adapters/Output/JWEncryptionService";
import * as crypto from "crypto";
import * as jose from "node-jose";

describe('EncryptionService', () =>
{
    let privateKey = null;
    let publicKey = null;

    beforeAll(async () =>
    {
        const { privateKey: prkey, publicKey: pubkey } = crypto.generateKeyPairSync("rsa",
        {
            modulusLength: 1024,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs1',
                format: 'pem'
            }
        });

        privateKey = await jose.JWK.asKey(prkey, "pem");
        publicKey = await jose.JWK.asKey(pubkey, "pem");
    });
    it('should encrypt and decrypt a simple string', async () =>
    {
        // Build
        const encryptionService = new JWEncryptionService();
        const data = 'Hello, World!';

        // Operate
        const encryptedData = await encryptionService.encrypt(data, publicKey, "3", 604800000);
        const decryptedData = await encryptionService.decrypt(encryptedData, privateKey);

        // Check
        expect(decryptedData).toBe(data);
    });

    // Add more test cases based on your specific scenarios
});
