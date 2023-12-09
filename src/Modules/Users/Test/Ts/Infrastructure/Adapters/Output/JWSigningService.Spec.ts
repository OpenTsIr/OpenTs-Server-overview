import * as crypto from "crypto";
import * as jose from "node-jose";
import JWSigningService from "src/Modules/Users/Main/Ts/Infrastructure/Adapters/Output/JWSigningService";

describe('SigningService', () =>
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
    it('should sign and verify a simple string', async () =>
    {
        // Build
        const signingService = new JWSigningService();
        const data = 'Hello, World!';

        // Operate
        const signedData = await signingService.sign(data, privateKey);
        const verifiedData = await signingService.verify(signedData, publicKey);

        // Check
        expect(verifiedData).toBe(data);
    });

    // Add more test cases based on your specific scenarios
});
