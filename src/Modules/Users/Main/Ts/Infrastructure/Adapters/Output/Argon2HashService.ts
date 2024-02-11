import * as argon2 from "argon2";
import { IHashService } from "src/Modules/Users/Main/Ts/Application/Ports/Output/IHashService";

export class Argon2HashService implements IHashService
{
    public async createHash(data: string): Promise<string>
    {
        return await argon2.hash(data);
    }
    public async compare(hash: string, data: string): Promise<boolean>
    {
        return await argon2.verify(hash, data);
    }
}
