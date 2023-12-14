import { BadRequestException, Inject, NotFoundException } from "@nestjs/common";
import { IUserRepository } from "src/Modules/Users/Main/Ts/Application/Ports/Output/IUserRepository";
import { IAssignAuthorRoleUseCase } from "src/Modules/Users/Main/Ts/Application/UseCases/IAssignAuthorRoleUseCase";
import Result from "src/Modules/Common/Main/Ts/Application/Result";
import AssignAuthorRoleCommand from "src/Modules/Users/Main/Ts/Application/Commands/AssignAuthorRoleCommand";
import NullUserSpecification from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Specifications/NullUserSpecification";
import UserId from "src/Modules/Users/Main/Ts/Domain/UserAggregate/UserId";

export default class AssignAuthorRole implements IAssignAuthorRoleUseCase
{
    constructor (@Inject(IUserRepository) private readonly _userRepository: IUserRepository)
    { }
    async handle(command: AssignAuthorRoleCommand): Promise<Result<void>>
    {
        const userIdCreationResult = UserId.createFromInput(command.userId);

        if (userIdCreationResult.isFailure())
        {
            throw new BadRequestException("شناسه کاربر معتبر نیست");
        }
        const user = await this._userRepository.getUserById(userIdCreationResult.value);

        const isNullUser = new NullUserSpecification().isSatisfiedBy(user);

        if (isNullUser)
        {
            throw new NotFoundException("چنین کاربری وجود ندارد");
        }
        user.makeAuthor();

        await this._userRepository.promoteUserToAuthor(user);

        return Result.ok();
    }
}
