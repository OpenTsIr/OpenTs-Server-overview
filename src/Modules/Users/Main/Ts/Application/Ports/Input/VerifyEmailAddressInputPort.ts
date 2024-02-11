import { Inject, PreconditionFailedException } from "@nestjs/common";
import { ITokenService } from "src/Modules/Users/Main/Ts/Application/Ports/Output/ITokenService";
import { IUserRepository } from "src/Modules/Users/Main/Ts/Application/Ports/Output/IUserRepository";
import { IVerifyEmailAddressUseCase } from "src/Modules/Users/Main/Ts/Application/UseCases/IVerifyEmailAddressUseCase";
import Result from "src/Modules/Common/Main/Ts/Application/Result";
import VerifyEmailAddressCommand from "src/Modules/Users/Main/Ts/Application/Commands/VerifyEmailAddressCommand";
import Email from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Email";
import User from "src/Modules/Users/Main/Ts/Domain/UserAggregate/User";

export default class VerifyEmailAddressInputPort implements IVerifyEmailAddressUseCase
{
    public constructor
        (
            @Inject(IUserRepository)
            private readonly _userRepository: IUserRepository,
            @Inject(ITokenService)
            private readonly _tokenService: ITokenService
        )
    { }
    public async handle(command: VerifyEmailAddressCommand): Promise<Result<void>>
    {
        const { email } = JSON.parse(await this._tokenService.validate(command.emailVerificationToken));

        let user: User = null;

        user = await this._userRepository.getUserByEmailAddress(email);

        if (user === null)
        {
            throw new PreconditionFailedException("چنین کاربری وجود ندارد");
        }
        user.verifyEmailAddress();

        await this._userRepository.verifyUser(Email.createFromValid(email).value);

        return Result.ok();
    }
}
