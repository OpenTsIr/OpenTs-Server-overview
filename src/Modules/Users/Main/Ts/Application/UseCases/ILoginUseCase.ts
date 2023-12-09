import IQueryHandler from "src/Modules/Common/Main/Ts/Application/IQueryHandler";
import LoginCommand from "src/Modules/Users/Main/Ts/Application/Commands/LoginCommand";
import { LoginDto } from "src/Modules/Users/Main/Ts/Application/Dto/LoginDto";

export const ILoginUseCase = Symbol("ILoginUseCase").valueOf();
export interface ILoginUseCase extends IQueryHandler<LoginCommand, LoginDto>
{ }
