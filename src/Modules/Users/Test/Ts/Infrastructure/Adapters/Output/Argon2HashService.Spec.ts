import { Argon2HashService } from "src/Modules/Users/Main/Ts/Infrastructure/Adapters/Output/Argon2HashService";

describe("Argon2HashService", () =>
{
    const hashService = new Argon2HashService();
    let plainText: string;
    let hash: string;

    it("hashes a plain string", async () =>
    {
        // build
        plainText = "a plain text";

        // operate
        hash = await hashService.createHash(plainText);

        // check
        expect(hash).not.toEqual(plainText);
    });
    it("compairs two hashes, returns true in the case of same input", async () =>
    {
        //operate
        const compareResult = await hashService.compare(hash, plainText);

        // check
        expect(compareResult).toBe(true);
    });
    it("compairs two hashes, returns true in the case of same input", async () =>
    {
        // build
        const plainText = "another plain text";
        
        //operate
        const compareResult = await hashService.compare(hash, plainText);

        // check
        expect(compareResult).toBe(false);
    });
});