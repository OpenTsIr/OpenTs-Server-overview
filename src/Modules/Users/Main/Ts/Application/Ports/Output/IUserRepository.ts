import Email from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Email";
import Password from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Password";
import User from "src/Modules/Users/Main/Ts/Domain/UserAggregate/User";
import UserId from "src/Modules/Users/Main/Ts/Domain/UserAggregate/UserId";

export const IUserRepository = Symbol("IUserRepository").valueOf();
export interface IUserRepository
{
    isAccountAvailable(email: Email): Promise<boolean>;
    registerNewUser(user: User, hashedPassword: Password): Promise<void>;
    getUserByEmailAddress(email: Email): Promise<User>;
    getUserById(userId: UserId): Promise<User>;
    verifyUser(email: Email): Promise<void>;
    promoteUserToAuthor(user: User): Promise<void>;
    promoteUserToAdmin(user: User): Promise<void>;
    promoteUserToModerator(user: User): Promise<void>;
}
