import Notification from "src/Modules/Common/Main/Ts/Application/Notification";
import Result from "src/Modules/Common/Main/Ts/Application/Result";
import ValueObject from "src/Modules/Common/Main/Ts/Domain/SeedWorks/ValueObject";

export default class Password extends ValueObject<string>
{
    static PASSWORD_COULD_NOT_BE_AN_EMPTY_STRING = "نام نمایشی نمیتواند خالی باشد";
    static INVALID_LENGTH = "رمز عبور باید بین ۸ الی ۲۰ کاراکتر باشد";
    static PASSWORD_NOT_MATCH = "گذرواژه‌های وارد شده همخوانی ندارند ";

    private static isValid(aPassword: string, aNotification: Notification)
    {
        if (aPassword.length === 0)
        {
            aNotification.addError(Password.PASSWORD_COULD_NOT_BE_AN_EMPTY_STRING);
        }
        if ((aPassword.length < 8) || (aPassword.length > 20))
        {
            aNotification.addError(Password.INVALID_LENGTH);
        }
        return aNotification;
    }
    static createFromInput(aPassword: string): Result<Password>
    {
        const notification = new Notification();
        const password = String(aPassword).trim();

        if (Password.isValid(password, notification).hasErrors())
        {
            return Result.fail(notification);
        }
        return Result.ok(new Password({ value: password }));
    }
    static createFromHashed(aHashedPassword: string)
    {
        return Result.ok(new Password({ value: aHashedPassword }));
    }
    compareWithConfirm(aPassword: Password): Result<Password>
    {
        const notification = new Notification();

        if (!aPassword.equals(this))
        {
            notification.addError(Password.PASSWORD_NOT_MATCH);
            return Result.fail(notification);
        }
        return Result.ok(aPassword);
    }
}
