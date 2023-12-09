import { ICommandHandler } from "src/Modules/Common/Main/Ts/Application/ICommandHandler";
import AssignAdminRoleCommand from "src/Modules/Users/Main/Ts/Application/Commands/AssignAdminRoleCommand";

export const IAssignAdminRoleUseCase = Symbol("IAssignAdminRoleUseCase").valueOf();
export interface IAssignAdminRoleUseCase extends ICommandHandler<AssignAdminRoleCommand>
{ }
