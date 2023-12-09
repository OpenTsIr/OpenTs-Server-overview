import { ICommandHandler } from 'src/Modules/Common/Main/Ts/Application/ICommandHandler';
import ChangePasswordCommand from 'src/Modules/Users/Main/Ts/Application/Commands/ChangePasswordCommand';

export const IChangePasswordUseCase = Symbol("IChangePasswordUseCase").valueOf();
export interface IChangePasswordUseCase extends ICommandHandler<ChangePasswordCommand>
{ }
