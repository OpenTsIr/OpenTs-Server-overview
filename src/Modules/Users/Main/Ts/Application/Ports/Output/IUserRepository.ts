import Email from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Email";
import Password from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Password";
import User from "src/Modules/Users/Main/Ts/Domain/UserAggregate/User";

export const IUserRepository = Symbol("IUserRepository").valueOf();
export interface IUserRepository
{
    isAccountAvailable(email: Email): Promise<boolean>;
    registerNewUser(email: Email, hashedPassword: Password): Promise<void>;
    getUserByEmailAddress(email: Email): Promise<User>;
    verifyUser(email: Email): Promise<void>;
}
