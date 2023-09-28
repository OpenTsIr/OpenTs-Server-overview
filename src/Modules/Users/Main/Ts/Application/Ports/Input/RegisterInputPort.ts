import RegisterUseCase from "src/Modules/Users/Main/Ts/Application/UseCases/RegisterUseCase";

export default class RegisterInputPort extends RegisterUseCase
{
    constructor (private readonly _encryptionService: IEncryptionService)
    { }
}
