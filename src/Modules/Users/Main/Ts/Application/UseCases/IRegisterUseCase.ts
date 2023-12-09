import { ICommandHandler } from "src/Modules/Common/Main/Ts/Application/ICommandHandler";
import RegisterCommand from "src/Modules/Users/Main/Ts/Application/Commands/RegisterCommand";

export const IRegisterUseCase = Symbol("IRegisterUseCase").valueOf();
export interface IRegisterUseCase extends ICommandHandler<RegisterCommand>
{ }
