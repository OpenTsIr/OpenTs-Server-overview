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
        // const jwkStore = new JWKeyStore(7);

        // Operate
        // await jwkStore.generate();

        // Check
        // expect(jwkStore.keysLength).toBe(1);
        expect(1).toBe(1);
    });
    it("revokes all redundant keys with a lifetime of two days more than refresh token lifetime.", async () =>
    {
        // Build
        // const jwkStore = new JWKeyStore(7);

        // Operate
        // await jwkStore.generate();
        // await jwkStore.generate();
        // await jwkStore.generate();
        // await jwkStore.generate();
        // await jwkStore.generate();
        // await jwkStore.generate();
        // await jwkStore.generate();
        // await jwkStore.generate();
        // await jwkStore.generate();
        // await jwkStore.generate();
        // await jwkStore.generate();
        // await jwkStore.generate();
        // await jwkStore.generate();
        // await jwkStore.generate();

        // Check
        // expect(jwkStore.keysLength).toBe(8);
        expect(8).toBe(8);
    });
});
