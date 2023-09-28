import { ITokenService } from "src/Modules/Users/Main/Ts/Application/Ports/Output/ITokenService";

export default class JWTokenService implements ITokenService
{
    create(data: string): string
    {
        throw new Error("Method not implemented.");
    }
    extract(token: string): string
    {
        throw new Error("Method not implemented.");
    }
}
