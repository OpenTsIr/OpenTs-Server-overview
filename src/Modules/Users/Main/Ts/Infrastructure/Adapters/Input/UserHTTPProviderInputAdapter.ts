import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { IRegisterUseCase } from "src/Modules/Users/Main/Ts/Application/UseCases/IRegisterUseCase";
import RegisterCommand from "src/Modules/Users/Main/Ts/Application/Commands/RegisterCommand";
import LoginCommand from "src/Modules/Users/Main/Ts/Application/Commands/LoginCommand";
import { ILoginUseCase } from "src/Modules/Users/Main/Ts/Application/UseCases/ILoginUseCase";
import VerifyEmailAddressCommand from "src/Modules/Users/Main/Ts/Application/Commands/VerifyEmailAddressCommand";
import { IVerifyEmailAddressUseCase } from "src/Modules/Users/Main/Ts/Application/UseCases/IVerifyEmailAddressUseCase";

@Controller("Authentication")
export default class UserHTTPProviderInputAdapter
{
    constructor
        (
            @Inject(IRegisterUseCase)
            private readonly _registerInputPort: IRegisterUseCase,
            @Inject(ILoginUseCase)
            private readonly _loginInputPort: ILoginUseCase,
            @Inject(IVerifyEmailAddressUseCase)
            private readonly _verifyEmailAddressInputPort: IVerifyEmailAddressUseCase
        )
    { }
    @Post("/Register")
    async registerNewUser(@Body() registerCommand: RegisterCommand)
    {
        await this._registerInputPort.handle(registerCommand);
    }
    @Post("/Login")
    async login(@Body() login: LoginCommand)
    {
        return await this._loginInputPort.handleQuery(login);
    }
    @Get("/VerifyEmailAddress/:emailVerificationToken")
    async verifyEmailAddress(@Param() emailVerificationToken: VerifyEmailAddressCommand)
    {
        return await this._verifyEmailAddressInputPort.handle(emailVerificationToken);
    }
}
