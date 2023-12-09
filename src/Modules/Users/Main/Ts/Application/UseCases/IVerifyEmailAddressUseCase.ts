import { ICommandHandler } from "src/Modules/Common/Main/Ts/Application/ICommandHandler";
import VerifyEmailAddressCommand from "src/Modules/Users/Main/Ts/Application/Commands/VerifyEmailAddressCommand";

export const IVerifyEmailAddressUseCase = Symbol("IVerifyEmailAddressUseCase").valueOf();
export interface IVerifyEmailAddressUseCase extends ICommandHandler<VerifyEmailAddressCommand>
{ }
