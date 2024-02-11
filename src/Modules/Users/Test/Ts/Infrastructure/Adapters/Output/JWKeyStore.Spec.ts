import JWKeyStore from "src/Modules/Users/Main/Ts/Infrastructure/Adapters/Output/JWKeyStore";
import * as fs from "fs";

describe("JWKeyStore", () =>
{
    beforeEach(() =>
    {
        const filenames = fs.readdirSync(process.cwd() + "/keys", "utf-8");

        for (const filename of filenames)
        {
            fs.unlinkSync(process.cwd() + "/keys/" + filename);
        }
    });
    it("generates and adds new keys to JWK store", async () =>
    {
        // Build
        const jwkStore = new JWKeyStore();
        // Operate
        await jwkStore.generate();

        await jwkStore.loadKeys();
        // Check
        expect(jwkStore.keysLength).toBe(1);
    });
    it("revokes all redundant keys with a lifetime of two days more than refresh token lifetime.", async () =>
    {
        // Build
        const jwkStore = new JWKeyStore();

        // Operate
        for (const _ of new Array(14))
        {
            await jwkStore.generate();
            await jwkStore.loadKeys();
        }
        // Check
        expect(jwkStore.keysLength).toBe(8);
    });
});
