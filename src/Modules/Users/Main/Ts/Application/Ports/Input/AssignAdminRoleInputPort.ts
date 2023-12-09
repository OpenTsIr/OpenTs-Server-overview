import Result from "src/Modules/Common/Main/Ts/Application/Result";
import AssignAdminRoleCommand from "src/Modules/Users/Main/Ts/Application/Commands/AssignAdminRoleCommand";
import { IAssignAdminRoleUseCase } from "src/Modules/Users/Main/Ts/Application/UseCases/IAssignAdminRoleUseCase";

export default class AssignAdminRoleInputPort implements IAssignAdminRoleUseCase
{
    handle(command: AssignAdminRoleCommand): Result<void> | Promise<Result<void>>
    {
        throw new Error("Method not implemented.");
    }
}
