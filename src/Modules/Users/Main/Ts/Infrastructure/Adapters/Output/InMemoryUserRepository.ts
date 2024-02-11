import { NotFoundException } from "@nestjs/common";
import { IUserRepository } from "src/Modules/Users/Main/Ts/Application/Ports/Output/IUserRepository";
import Email from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Email";
import Password from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Password";
import User from "src/Modules/Users/Main/Ts/Domain/UserAggregate/User";
import UserId from "src/Modules/Users/Main/Ts/Domain/UserAggregate/UserId";

export class InMemoryUserRepository implements IUserRepository
{
    private _users: { email: string, password: string; isConfirmed: boolean; }[] = [];

    public getUserById(userId: UserId): Promise<User>
    {
        throw new Error("Method not implemented.");
    }
    public verifyUser(email: Email): Promise<void>
    {
        throw new Error("Method not implemented.");
    }
    public promoteUserToAuthor(user: User): Promise<void>
    {
        throw new Error("Method not implemented.");
    }
    public promoteUserToAdmin(user: User): Promise<void>
    {
        throw new Error("Method not implemented.");
    }
    public promoteUserToModerator(user: User): Promise<void>
    {
        throw new Error("Method not implemented.");
    }
    public isAccountAvailable(email: Email): Promise<boolean>
    {
        const user = this._users.find((u) => (u.email === email.value && u.isConfirmed === true));

        if (!user)
        {
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }
    public registerNewUser(email: Email, hashedPassword: Password): Promise<void>
    {
        this._users.push({ email: email.value, password: hashedPassword.value, isConfirmed: true });

        console.log(this._users);

        return Promise.resolve();
    }
    public getUserByEmailAddress(email: Email): Promise<User>
    {
        const user = this._users.find((u) => u.email === email.value);

        if (!user)
        {
            throw new NotFoundException("چنین کاربری وجود ندارد");
        }
        return Promise.resolve(user) as unknown as never;
    }
}
