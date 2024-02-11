import { Inject, PreconditionFailedException, UnprocessableEntityException } from "@nestjs/common";
import { IHashService } from "src/Modules/Users/Main/Ts/Application/Ports/Output/IHashService";
import { IUserRepository } from "src/Modules/Users/Main/Ts/Application/Ports/Output/IUserRepository";
import { IRegisterUseCase } from "src/Modules/Users/Main/Ts/Application/UseCases/IRegisterUseCase";
import Password from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Password";
import Result from "src/Modules/Common/Main/Ts/Application/Result";
import RegisterCommand from "src/Modules/Users/Main/Ts/Application/Commands/RegisterCommand";
import Email from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Email";

export default class RegisterInputPort implements IRegisterUseCase
{
    public constructor
        (
            @Inject(IUserRepository)
            private readonly _userRepository: IUserRepository,
            @Inject(IHashService)
            private readonly _hashService: IHashService
        )
    { }
    public async handle(command: RegisterCommand): Promise<Result<void>>
    {
        const emailResult = Email.createFromInput(command.email);
        const passwordResult = Password.createFromInput(command.password);
        const confirmPasswordResult = Password.createFromInput(command.confirmPassword);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let validationResult: Result<any> = null;

        if (passwordResult.isSuccess() && confirmPasswordResult.isSuccess())
        {
            const comparePasswordsResult = confirmPasswordResult.value.compareWithConfirm(passwordResult.value);

            validationResult = Result.combine([ emailResult, passwordResult, confirmPasswordResult, comparePasswordsResult ]);
        }
        else
        {
            validationResult = Result.combine([ emailResult, passwordResult, confirmPasswordResult ]);
        }
        if (validationResult.isFailure())
        {
            throw new UnprocessableEntityException(validationResult.getError().getMessages());
        }
        const isAccountAvailable = await this._userRepository.isAccountAvailable(emailResult.value);

        if (!isAccountAvailable)
        {
            throw new PreconditionFailedException("این آدرس ایمیل از قبل وجود دارد");
        }
        const hashedPassword = await this._hashService.createHash(passwordResult.value.value);

        await this._userRepository.registerNewUser(emailResult.value, Password.createFromHashed(hashedPassword).value);

        return Result.ok();
    }
}
