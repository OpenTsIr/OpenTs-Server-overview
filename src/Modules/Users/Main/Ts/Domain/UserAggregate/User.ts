import ResetPasswordToken from "src/Modules/Users/Main/Ts/Domain/UserAggregate/ResetPasswordToken";
import Email from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Email";
import Nickname from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Nickname";
import Password from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Password";
import Roles from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Roles";
import IAggregateRoot from "src/Modules/Common/Main/Ts/Domain/SeedWorks/IAggregateRoot";
import EmailVerificationToken from "src/Modules/Users/Main/Ts/Domain/UserAggregate/EmailVerificationToken";
import EmailVerificationStatus from "src/Modules/Users/Main/Ts/Domain/UserAggregate/EmailVerificationStatus";
import UserId from "src/Modules/Users/Main/Ts/Domain/UserAggregate/UserId";
import ConcurrencySafeEntity from "src/Modules/Common/Main/Ts/Domain/SeedWorks/ConcurrencySafeEntity";
import NewUserRegistered from "src/Modules/Users/Main/Ts/Domain/UserAggregate/NewUserRegistered";
import EmailVerified from "src/Modules/Users/Main/Ts/Domain/UserAggregate/EmailVerified";
import UserLoggedIn from "src/Modules/Users/Main/Ts/Domain/UserAggregate/UserLoggedIn";
import AuthorRoleAssignedToUser from "src/Modules/Users/Main/Ts/Domain/UserAggregate/AuthorRoleAssignedToUser";
import ModeratorRoleAssignedToUser from "src/Modules/Users/Main/Ts/Domain/UserAggregate/ModeratorRoleAssignedToUser";
import AdminRoleAssignedToUser from "src/Modules/Users/Main/Ts/Domain/UserAggregate/AdminRoleAssignedToUser";
import RootRoleAssignedToUser from "src/Modules/Users/Main/Ts/Domain/UserAggregate/RootRoleAssignedToUser";
import UUID from "src/Modules/Common/Main/Ts/Domain/SeedWorks/UUID";
import ResetPasswordTokenIssued from "src/Modules/Users/Main/Ts/Domain/UserAggregate/ResetPasswordTokenIssued";
import PasswordChanged from "src/Modules/Users/Main/Ts/Domain/UserAggregate/PasswordChanged";

export default class User extends ConcurrencySafeEntity<UserId> implements IAggregateRoot
{
    private _email: Email;
    private _password: Password;
    private _nickname: Nickname;
    private _role: Roles;
    private _resetPasswordToken?: ResetPasswordToken;
    private _resetPasswordTokenIssuedAt?: Date;
    private _emailVerificationToken: EmailVerificationToken;
    private _emailVerificationStatus: EmailVerificationStatus;
    private _emailVerificationTokenIssuedAt: Date;
    private _createdAt: Date;
    private _updatedAt: Date;

    public get email(): Email
    {
        return this._email;
    }
    public set email(value: Email)
    {
        this._email = value;
    }
    public get password(): Password
    {
        return this._password;
    }
    public set password(value: Password)
    {
        this._password = value;
    }
    public get nickname(): Nickname
    {
        return this._nickname;
    }
    public set nickname(value: Nickname)
    {
        this._nickname = value;
    }
    public get role(): Roles
    {
        return this._role;
    }
    public set role(value: Roles)
    {
        this._role = value;
    }
    public get resetPasswordToken(): ResetPasswordToken
    {
        return this._resetPasswordToken;
    }
    public set resetPasswordToken(value: ResetPasswordToken)
    {
        this._resetPasswordToken = value;
    }
    public get resetPasswordTokenIssuedAt(): Date
    {
        return this._resetPasswordTokenIssuedAt;
    }
    public set resetPasswordTokenIssuedAt(value: Date)
    {
        this._resetPasswordTokenIssuedAt = value;
    }
    public get emailVerificationToken(): EmailVerificationToken
    {
        return this._emailVerificationToken;
    }
    public set emailVerificationToken(value: EmailVerificationToken)
    {
        this._emailVerificationToken = value;
    }
    public get emailVerificationStatus(): EmailVerificationStatus
    {
        return this._emailVerificationStatus;
    }
    public set emailVerificationStatus(value: EmailVerificationStatus)
    {
        this._emailVerificationStatus = value;
    }
    public get emailVerificationTokenIssuedAt(): Date
    {
        return this._emailVerificationTokenIssuedAt;
    }
    public set emailVerificationTokenIssuedAt(value: Date)
    {
        this._emailVerificationTokenIssuedAt = value;
    }
    public get createdAt(): Date
    {
        return this._createdAt;
    }
    public set createdAt(value: Date)
    {
        this._createdAt = value;
    }
    public get updatedAt(): Date
    {
        return this._updatedAt;
    }
    public set updatedAt(value: Date)
    {
        this._updatedAt = value;
    }
    public register(userId: UserId, nickname: Nickname, email: Email, password: Password, emailVerificationToken: EmailVerificationToken, emailVerificationTokenIssuedAt: Date, concurrenyVersion: number): void
    {
        this.id = userId;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.concurrencyVersion = concurrenyVersion;
        this.role = Roles.USER;
        this.emailVerificationStatus = EmailVerificationStatus.PENDING_EMAIL_VERIFICATION;
        this.emailVerificationToken = emailVerificationToken;
        this.emailVerificationTokenIssuedAt = emailVerificationTokenIssuedAt;

        this.addEvent
        (
            new NewUserRegistered
            (
                userId,
                email,
                nickname
            )
        );
    }
    public verifyEmailAddress()
    {
        this.emailVerificationStatus = EmailVerificationStatus.EMAIL_VERIFIED;
        this.emailVerificationToken = null;
        this.emailVerificationTokenIssuedAt = null;
        this.concurrencyVersion = this.concurrencyVersion + 1;

        this.addEvent
        (
            new EmailVerified
            (
                this.id,
                this.email,
                this.nickname
            )
        );
    }
    public login( userId: UserId,  nickname: Nickname,  email: Email,  password: Password,  role: Roles,  emailVerificationStatus: EmailVerificationStatus, concurrencyVersion: number)
    {
        this.id = userId;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.concurrencyVersion = concurrencyVersion;
        this.role = role;
        this.emailVerificationStatus = emailVerificationStatus;

        this.addEvent
        (
            new UserLoggedIn
            (
                userId,
                email,
                nickname
            )
        );
    }
    public makeAuthor()
    {
        this.role = Roles.AUTHOR;
        this.concurrencyVersion = this.concurrencyVersion + 1;

        this.addEvent
        (
            new AuthorRoleAssignedToUser
            (
                this.id,
                this.email,
                this.nickname
            )
        );
    }
    public makeModerator()
    {
        this.role = Roles.MODERATOR;
        this.concurrencyVersion = this.concurrencyVersion + 1;
        
        this.addEvent
        (
            new ModeratorRoleAssignedToUser
            (
                this.id,
                this.email,
                this.nickname
            )
        );
    }
    public makeAdmin()
    {
        this.role = Roles.ADMIN;
        this.concurrencyVersion = this.concurrencyVersion + 1;
    
        this.addEvent
        (
            new AdminRoleAssignedToUser
            (
                this.id,
                this.email,
                this.nickname
            )
        )
    }
    public makeRoot()
    {
        this.role = Roles.ROOT;
        this.concurrencyVersion = this.concurrencyVersion + 1;

        this.addEvent
        (
            new RootRoleAssignedToUser
            (
                this.id,
                this.email,
                this.nickname
            )
        );
    }
    public requestResettingPassword()
    {
        this.resetPasswordToken = ResetPasswordToken.create().value;
        this.resetPasswordTokenIssuedAt = new Date();
        this.concurrencyVersion = this.concurrencyVersion + 1;

        this.addEvent
        (
            new ResetPasswordTokenIssued
            (
                this.id,
                this.email,
                this.nickname,
                this.resetPasswordToken
            )
        );
    }
    public resetPassword(aNewPassword: Password)
    {
        this.password = aNewPassword;
        this.resetPasswordToken = null;
        this.resetPasswordTokenIssuedAt = null;
        this.concurrencyVersion = this.concurrencyVersion + 1;

        this.addEvent
        (
            new PasswordChanged
            (
                this.id,
                this.email,
                this.nickname
            )
        );
    }
}
