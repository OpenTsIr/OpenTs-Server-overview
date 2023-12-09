import EmailVerificationStatus from "src/Modules/Users/Main/Ts/Domain/UserAggregate/EmailVerificationStatus";
import Email from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Email";
import Nickname from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Nickname";
import Password from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Password";
import Roles from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Roles";
import User from "src/Modules/Users/Main/Ts/Domain/UserAggregate/User";
import UserId from "src/Modules/Users/Main/Ts/Domain/UserAggregate/UserId";
import UUID from "src/Modules/Common/Main/Ts/Domain/SeedWorks/UUID";
import NewUserRegistered from "src/Modules/Users/Main/Ts/Domain/UserAggregate/NewUserRegistered";
import EmailVerified from "src/Modules/Users/Main/Ts/Domain/UserAggregate/EmailVerified";
import UserLoggedIn from "src/Modules/Users/Main/Ts/Domain/UserAggregate/UserLoggedIn";
import AuthorRoleAssignedToUser from "src/Modules/Users/Main/Ts/Domain/UserAggregate/AuthorRoleAssignedToUser";
import ModeratorRoleAssignedToUser from "src/Modules/Users/Main/Ts/Domain/UserAggregate/ModeratorRoleAssignedToUser";
import AdminRoleAssignedToUser from "src/Modules/Users/Main/Ts/Domain/UserAggregate/AdminRoleAssignedToUser";
import RootRoleAssignedToUser from "src/Modules/Users/Main/Ts/Domain/UserAggregate/RootRoleAssignedToUser";
import ResetPasswordTokenIssued from "src/Modules/Users/Main/Ts/Domain/UserAggregate/ResetPasswordTokenIssued";
import PasswordChanged from "src/Modules/Users/Main/Ts/Domain/UserAggregate/PasswordChanged";
import EmailVerificationToken from "src/Modules/Users/Main/Ts/Domain/UserAggregate/EmailVerificationToken";
import UserStatus from "src/Modules/Users/Main/Ts/Domain/UserStatus";

let nickname: Nickname = null;
let email: Email = null;
let password: Password = null;
let userId: UserId = null;
let concurrencyVersion: number = null;
let user: User = null;
let emailVerificationToken: EmailVerificationToken = null;
let emailVerificationTokenIssuedAt: Date = null;

const checkForEventExistance = function (eventSource: Set<any>, eventType: new (...any: any) => any)
{
    return expect(Array.from(eventSource).find(e => e.type == eventType.name)).toBeInstanceOf(eventType);
};
const ensureConcurrencyVersionIncrementsByOne = function (currentConcurrencyVersion: number, expectedConcurrencyVersion: number)
{
    return expect(currentConcurrencyVersion).toEqual(expectedConcurrencyVersion);
};

describe("User AggregateRoot", () =>
{
    it("registers a user", () =>
    {
        nickname = Nickname.createFromInput("bahmanbs").value;
        email = Email.createFromInput("bahmanbs@hotmail.com").value;
        password = Password.createFromInput("123456789bahman").value;
        userId = UserId.create().value;
        concurrencyVersion = 1;
        emailVerificationToken = UUID.create().value;
        emailVerificationTokenIssuedAt = new Date();

        user = new User();

        user.register(userId, nickname, email, password, emailVerificationToken, emailVerificationTokenIssuedAt, concurrencyVersion);

        expect(user.emailVerificationToken).toBe(emailVerificationToken);
        expect(user.emailVerificationTokenIssuedAt).toBe(emailVerificationTokenIssuedAt);
        expect(user.status).toEqual(UserStatus.PENDING_EMAIL_VERIFICATION);
        expect(user.emailVerificationTokenIssuedAt).toEqual(emailVerificationTokenIssuedAt);
        expect(user.role).toEqual(Roles.USER);

        checkForEventExistance(user.getEvents(), NewUserRegistered);
    });
    it("verifies email address", async () =>
    {
        user.verifyEmailAddress();

        expect(user.status).toEqual(UserStatus.EMAIL_VERIFIED);
        expect(user.emailVerificationToken).toEqual(null);
        expect(user.emailVerificationTokenIssuedAt).toEqual(null);

        ensureConcurrencyVersionIncrementsByOne(user.concurrencyVersion, concurrencyVersion + 1);
        checkForEventExistance(user.getEvents(), EmailVerified);
    });
    it("makes the user an Author", async () =>
    {
        const concurrencyVersion = user.concurrencyVersion;

        user.makeAuthor();

        expect(user.role).toEqual(Roles.AUTHOR);

        ensureConcurrencyVersionIncrementsByOne(user.concurrencyVersion, concurrencyVersion + 1);
        checkForEventExistance(user.getEvents(), AuthorRoleAssignedToUser);
    });
    it("makes the user a Moderator", async () =>
    {
        const concurrencyVersion = user.concurrencyVersion;

        user.makeModerator();

        expect(user.role).toEqual(Roles.MODERATOR);

        ensureConcurrencyVersionIncrementsByOne(user.concurrencyVersion, concurrencyVersion + 1);
        checkForEventExistance(user.getEvents(), ModeratorRoleAssignedToUser);
    });
    it("makes the user an Admin", async () =>
    {
        const concurrencyVersion = user.concurrencyVersion;
        user.makeAdmin();

        expect(user.role).toEqual(Roles.ADMIN);

        ensureConcurrencyVersionIncrementsByOne(user.concurrencyVersion, concurrencyVersion + 1);
        checkForEventExistance(user.getEvents(), AdminRoleAssignedToUser);
    });
    it("makes the user a Root", async () =>
    {
        const concurrencyVersion = user.concurrencyVersion;
        user.makeRoot();

        expect(user.role).toEqual(Roles.ROOT);

        ensureConcurrencyVersionIncrementsByOne(user.concurrencyVersion, concurrencyVersion + 1);
        checkForEventExistance(user.getEvents(), RootRoleAssignedToUser);
    });
    it("requests for a resetting password", async () =>
    {
        const concurrencyVersion = user.concurrencyVersion;
        user.requestResettingPassword();

        expect(user.resetPasswordToken).toBeDefined();
        expect(user.resetPasswordTokenIssuedAt).toBeDefined();

        ensureConcurrencyVersionIncrementsByOne(user.concurrencyVersion, concurrencyVersion + 1);
        checkForEventExistance(user.getEvents(), ResetPasswordTokenIssued);
    });
    it("resets password", async () =>
    {
        const concurrencyVersion = user.concurrencyVersion;
        const newPassword = Password.createFromInput("123456789123456789");

        user.resetPassword(newPassword.value);

        expect(user.password.value).toEqual(newPassword.value.value);
        expect(user.password.value).not.toEqual(password.value);
        expect(user.resetPasswordToken).toEqual(null);
        expect(user.resetPasswordTokenIssuedAt).toEqual(null);

        ensureConcurrencyVersionIncrementsByOne(user.concurrencyVersion, concurrencyVersion + 1);
        checkForEventExistance(user.getEvents(), PasswordChanged);
    });
});
