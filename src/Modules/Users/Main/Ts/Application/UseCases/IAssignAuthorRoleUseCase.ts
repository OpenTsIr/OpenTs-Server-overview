import { ICommandHandler } from "src/Modules/Common/Main/Ts/Application/ICommandHandler";
import AssignAuthorRoleCommand from "src/Modules/Users/Main/Ts/Application/Commands/AssignAuthorRoleCommand";

export const IAssignAuthorRoleUseCase = Symbol("IAssignAuthorRoleUseCase").valueOf();
export interface IAssignAuthorRoleUseCase extends ICommandHandler<AssignAuthorRoleCommand>
{ }
