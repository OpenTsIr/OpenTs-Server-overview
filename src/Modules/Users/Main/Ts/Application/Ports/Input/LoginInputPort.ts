import { Inject, UnauthorizedException, UnprocessableEntityException } from "@nestjs/common";
import { LoginDto } from "src/Modules/Users/Main/Ts/Application/Dto/LoginDto";
import { IHashService } from "src/Modules/Users/Main/Ts/Application/Ports/Output/IHashService";
import { ITokenService } from "src/Modules/Users/Main/Ts/Application/Ports/Output/ITokenService";
import { IUserRepository } from "src/Modules/Users/Main/Ts/Application/Ports/Output/IUserRepository";
import { ILoginUseCase } from "src/Modules/Users/Main/Ts/Application/UseCases/ILoginUseCase";
import Result from "src/Modules/Common/Main/Ts/Application/Result";
import LoginCommand from "src/Modules/Users/Main/Ts/Application/Commands/LoginCommand";
import Email from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Email";
import Password from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Password";

export default class LoginUseCase implements ILoginUseCase
{
    public constructor
        (
            @Inject(IHashService)
            private readonly _hashService: IHashService,
            @Inject(ITokenService)
            private readonly _tokenService: ITokenService,
            @Inject(IUserRepository)
            private readonly _userRepository: IUserRepository
        )
    { }
    async handleQuery(command: LoginCommand): Promise<Result<LoginDto>>
    {
        const emailResult = Email.createFromInput(command.email);
        const passwordResult = Password.createFromInput(command.password);

        const validationResult = Result.combine([ emailResult, passwordResult ]);

        if (validationResult.isFailure())
        {
            throw new UnprocessableEntityException(validationResult.getError().getMessages());
        }
        const user = await this._userRepository.getUserByEmailAddress(emailResult.value);

        const isSamePassword = this._hashService.compare(user.password as any, passwordResult.value.value);

        if (!isSamePassword)
        {
            throw new UnauthorizedException("نام کاربری یا رمز عبور اشتباه است");
        }
        const userData = JSON.stringify
            ({
                email: user.email.value,
                id: user?.id?.value ?? "some id",
                role: user.role
            });
        const { accessToken, refreshToken } = await this._tokenService.create(userData);

        return Result.ok
            (
                new LoginDto
                    (
                        user.email?.value ?? user.email as any,
                        user.nickname?.value ?? "bahman",
                        user.id?.value ?? "some id",
                        accessToken,
                        refreshToken
                    )
            );
    }
}
