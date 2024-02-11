import { BadRequestException, PreconditionFailedException } from "@nestjs/common";
import { VerifiedSpecification } from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Specifications/VerifiedSpecification";
import ResetPasswordToken from "src/Modules/Users/Main/Ts/Domain/UserAggregate/ResetPasswordToken";
import Email from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Email";
import Nickname from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Nickname";
import Password from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Password";
import Roles from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Roles";
import IAggregateRoot from "src/Modules/Common/Main/Ts/Domain/SeedWorks/IAggregateRoot";
import EmailVerificationToken from "src/Modules/Users/Main/Ts/Domain/UserAggregate/EmailVerificationToken";
import UserId from "src/Modules/Users/Main/Ts/Domain/UserAggregate/UserId";
import ConcurrencySafeEntity from "src/Modules/Common/Main/Ts/Domain/SeedWorks/ConcurrencySafeEntity";
import NewUserRegistered from "src/Modules/Users/Main/Ts/Domain/UserAggregate/NewUserRegistered";
import EmailVerified from "src/Modules/Users/Main/Ts/Domain/UserAggregate/EmailVerified";
import AuthorRoleAssignedToUser from "src/Modules/Users/Main/Ts/Domain/UserAggregate/AuthorRoleAssignedToUser";
import ModeratorRoleAssignedToUser from "src/Modules/Users/Main/Ts/Domain/UserAggregate/ModeratorRoleAssignedToUser";
import AdminRoleAssignedToUser from "src/Modules/Users/Main/Ts/Domain/UserAggregate/AdminRoleAssignedToUser";
import RootRoleAssignedToUser from "src/Modules/Users/Main/Ts/Domain/UserAggregate/RootRoleAssignedToUser";
import ResetPasswordTokenIssued from "src/Modules/Users/Main/Ts/Domain/UserAggregate/ResetPasswordTokenIssued";
import PasswordChanged from "src/Modules/Users/Main/Ts/Domain/UserAggregate/PasswordChanged";
import UserStatus from "src/Modules/Users/Main/Ts/Domain/UserStatus";
import Specification from "src/Modules/Common/Main/Ts/Domain/SeedWorks/Specification/Specification";

export default class User extends ConcurrencySafeEntity<UserId> implements IAggregateRoot
{
    private _email: Email;
    private _password: Password;
    private _nickname: Nickname;
    private _role: Roles;
    private _resetPasswordToken?: ResetPasswordToken;
    private _resetPasswordTokenIssuedAt?: Date;
    private _emailVerificationToken: EmailVerificationToken;
    private _emailVerificationTokenIssuedAt: Date;
    private _status: UserStatus = UserStatus.PENDING_EMAIL_VERIFICATION;
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
    public get status(): UserStatus
    {
        return this._status;
    }
    public set status(status: UserStatus)
    {
        this._status = status;
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
        this.status = UserStatus.PENDING_EMAIL_VERIFICATION;
        this.emailVerificationToken = emailVerificationToken;
        this.emailVerificationTokenIssuedAt = emailVerificationTokenIssuedAt;

        this.validateInvariant();

        this.addEvent
            (
                new NewUserRegistered
                    (
                        userId,
                        email,
                        nickname
                    )
            );
        // user ( button, checkbox, radio button - dropdown - cli ) - other services - external applications - time

        // fake email address
        // email service not working
        // کاربر منصرف شده است -> UX
        // verifyEmailAddress route corrupted
        // server down

        // new UserDidNotCompletedRegistrationAfterTwoDays
        // (

        // )
    }
    public verifyEmailAddress(): void
    {
        this.status = UserStatus.EMAIL_VERIFIED;
        this.concurrencyVersion = this.concurrencyVersion + 1;

        this.validateInvariant();

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
    public makeAuthor(): void
    {
        this.role = Roles.AUTHOR;
        this.concurrencyVersion = this.concurrencyVersion + 1;

        this.validateInvariant();

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
    public makeModerator(): void
    {
        this.role = Roles.MODERATOR;
        this.concurrencyVersion = this.concurrencyVersion + 1;

        this.validateInvariant();

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
    public makeAdmin(): void
    {
        this.role = Roles.ADMIN;
        this.concurrencyVersion = this.concurrencyVersion + 1;

        this.validateInvariant();

        this.addEvent
            (
                new AdminRoleAssignedToUser
                    (
                        this.id,
                        this.email,
                        this.nickname
                    )
            );
    }
    public makeRoot(): void
    {
        this.role = Roles.ROOT;
        this.concurrencyVersion = this.concurrencyVersion + 1;

        this.validateInvariant();

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
    public requestResettingPassword(): void
    {
        this.resetPasswordToken = ResetPasswordToken.create().value;
        this.resetPasswordTokenIssuedAt = new Date();
        this.concurrencyVersion = this.concurrencyVersion + 1;

        this.validateInvariant();

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
    public resetPassword(aNewPassword: Password): void
    {
        this.password = aNewPassword;
        this.resetPasswordToken = null;
        this.resetPasswordTokenIssuedAt = null;
        this.concurrencyVersion = this.concurrencyVersion + 1;

        this.validateInvariant();

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
    private _getSpecification(): Specification<User>
    {
        switch (this.status)
        {
            case UserStatus.EMAIL_VERIFIED:
                {
                    return new VerifiedSpecification();
                }
            default:
                {
                    throw new BadRequestException("امکان انجام عملیات وجود ندارد");
                }
        }
    }
    public validateInvariant(): void
    {
        const specification = this._getSpecification();

        if (!specification.isSatisfiedBy(this))
        {
            throw new PreconditionFailedException("امکان پردازش درخواست وجود ندارد");
        }
    }
    public validatePreconditions(): void
    {
        throw new Error("Method not implemented.");
    }
}
