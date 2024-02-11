import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { IRegisterUseCase } from "src/Modules/Users/Main/Ts/Application/UseCases/IRegisterUseCase";
import { ILoginUseCase } from "src/Modules/Users/Main/Ts/Application/UseCases/ILoginUseCase";
import { IVerifyEmailAddressUseCase } from "src/Modules/Users/Main/Ts/Application/UseCases/IVerifyEmailAddressUseCase";
import { LoginDto } from "src/Modules/Users/Main/Ts/Application/Dto/LoginDto";
import Result from "src/Modules/Common/Main/Ts/Application/Result";
import RegisterCommand from "src/Modules/Users/Main/Ts/Application/Commands/RegisterCommand";
import LoginCommand from "src/Modules/Users/Main/Ts/Application/Commands/LoginCommand";
import VerifyEmailAddressCommand from "src/Modules/Users/Main/Ts/Application/Commands/VerifyEmailAddressCommand";

@Controller("Authentication")
export default class UserHTTPProviderInputAdapter
{
    public constructor
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
    public async registerNewUser(@Body() registerCommand: RegisterCommand): Promise<void>
    {
        await this._registerInputPort.handle(registerCommand);
    }
    @Post("/Login")
    public async login(@Body() login: LoginCommand): Promise<Result<LoginDto>>
    {
        return await this._loginInputPort.handleQuery(login);
    }
    @Get("/VerifyEmailAddress/:emailVerificationToken")
    public async verifyEmailAddress(@Param() emailVerificationToken: VerifyEmailAddressCommand): Promise<Result<void>>
    {
        return await this._verifyEmailAddressInputPort.handle(emailVerificationToken);
    }
}
