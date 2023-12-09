import { NotFoundException } from "@nestjs/common";
import { IUserRepository } from "src/Modules/Users/Main/Ts/Application/Ports/Output/IUserRepository";
import Email from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Email";
import Password from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Password";
import User from "src/Modules/Users/Main/Ts/Domain/UserAggregate/User";

export class InMemoryUserRepository implements IUserRepository
{
    private users: { email: string, password: string; isConfirmed: boolean; }[] = [];

    isAccountAvailable(email: Email): Promise<boolean>
    {
        const user = this.users.find((u) => (u.email === email.value && u.isConfirmed === true));

        if (!user)
        {
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }
    registerNewUser(email: Email, hashedPassword: Password): Promise<void>
    {
        this.users.push({ email: email.value, password: hashedPassword.value, isConfirmed: true });

        console.log(this.users);

        return Promise.resolve();
    }
    getUserByEmailAddress(email: Email): Promise<User>
    {
        const user = this.users.find((u) => u.email === email.value);

        if (!user)
        {
            throw new NotFoundException("چنین کاربری وجود ندارد");
        }
        return Promise.resolve(user) as unknown as any;
    }
}
