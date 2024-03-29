import DomainEvent from "src/Modules/Common/Main/Ts/Domain/SeedWorks/DomainEvent";
import Email from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Email";
import Nickname from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Nickname";
import UserId from "src/Modules/Users/Main/Ts/Domain/UserAggregate/UserId";

export default class NewUserRegistered extends DomainEvent
{
    public constructor (private _userId: UserId, private _email: Email, private _nickname: Nickname)
    {
        super();
    }
    public get email(): Email
    {
        return this._email;
    }
    public set email(value: Email)
    {
        this._email = value;
    }
    public get userId(): UserId
    {
        return this._userId;
    }
    public set userId(value: UserId)
    {
        this._userId = value;
    }
    public get nickname(): Nickname
    {
        return this._nickname;
    }
    public set nickname(value: Nickname)
    {
        this._nickname = value;
    }
}
