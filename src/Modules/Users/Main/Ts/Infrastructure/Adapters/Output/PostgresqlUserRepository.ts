import { IUserRepository } from "src/Modules/Users/Main/Ts/Application/Ports/Output/IUserRepository";
import Password from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Password";
import User from "src/Modules/Users/Main/Ts/Domain/UserAggregate/User";

export class PostgresqlUserRepository implements IUserRepository
{
    getUserByEmailAddress(email: Password): Promise<User>
    {
        throw new Error("Method not implemented.");
    }
    registerNewUser(email: Password, password: Password): Promise<void>
    {
        throw new Error("Method not implemented.");
    }
    isAccountAvailable(email: Password): Promise<boolean>
    {
        throw new Error("Method not implemented.");
    }
}
