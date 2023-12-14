import { Inject, BadRequestException, NotFoundException } from "@nestjs/common";
import Result from "src/Modules/Common/Main/Ts/Application/Result";
import AssignModeratorRoleCommand from "src/Modules/Users/Main/Ts/Application/Commands/AssignModeratorRoleCommand";
import { IUserRepository } from "src/Modules/Users/Main/Ts/Application/Ports/Output/IUserRepository";
import { IAssignModeratorRoleUseCase } from "src/Modules/Users/Main/Ts/Application/UseCases/IAssignModeratorRoleUseCase";
import NullUserSpecification from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Specifications/NullUserSpecification";
import UserId from "src/Modules/Users/Main/Ts/Domain/UserAggregate/UserId";

export default class AssignModeratorRole implements IAssignModeratorRoleUseCase
{
    constructor (@Inject(IUserRepository) private readonly _userRepository: IUserRepository)
    { }
    async handle(command: AssignModeratorRoleCommand): Promise<Result<void>>
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
        user.makeModerator();

        await this._userRepository.promoteUserToModerator(user);

        return Result.ok();
    }
}
