import { ICommandHandler } from "src/Modules/Common/Main/Ts/Application/ICommandHandler";
import LoginByGoogleCommand from "src/Modules/Users/Main/Ts/Application/Commands/LoginByGoogleCommand";

export const ILoginByGoogleUseCase = Symbol("ILoginByGoogleUseCase").valueOf();
export interface ILoginByGoogleUseCase extends ICommandHandler<LoginByGoogleCommand>
{ }
