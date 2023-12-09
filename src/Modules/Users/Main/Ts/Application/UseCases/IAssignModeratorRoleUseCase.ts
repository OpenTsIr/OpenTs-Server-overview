import { ICommandHandler } from 'src/Modules/Common/Main/Ts/Application/ICommandHandler';
import AssignModeratorRoleCommand from 'src/Modules/Users/Main/Ts/Application/Commands/AssignModeratorRoleCommand';

export const IAssignModeratorRoleUseCase = Symbol("IAssignModeratorRoleUseCase").valueOf();
export interface IAssignModeratorRoleUseCase extends ICommandHandler<AssignModeratorRoleCommand>
{ }
