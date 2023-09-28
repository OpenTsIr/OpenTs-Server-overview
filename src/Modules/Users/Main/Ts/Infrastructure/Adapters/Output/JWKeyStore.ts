import IKeyStore from "src/Modules/Users/Main/Ts/Application/Ports/Output/IKeyStore";

export default class JWKeyStore implements IKeyStore
{
    generate(): void
    {
        throw new Error("Method not implemented.");
    }
}
