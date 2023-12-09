import { ICommandHandler } from "src/Modules/Common/Main/Ts/Application/ICommandHandler";
import RequestForResetPasswordCommand from "src/Modules/Users/Main/Ts/Application/Commands/RequestForResetPasswordCommand";

export const IRequestForResetPasswordUseCase = Symbol("IRequestForResetPasswordUseCase").valueOf();
export interface IRequestForResetPasswordUseCase extends ICommandHandler<RequestForResetPasswordCommand>
{ }
