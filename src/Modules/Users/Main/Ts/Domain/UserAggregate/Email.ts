import Result from "src/Modules/Common/Main/Ts/Application/Result";
import Notification from "src/Modules/Common/Main/Ts/Application/Notification";
import ValueObject from "src/Modules/Common/Main/Ts/Domain/SeedWorks/ValueObject";

export default class Email extends ValueObject<string>
{
    private static _regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    public static INVALID_FORMAT = "فرمت ایمیل وارد شده معتبر نیست";
    public static MINIMUM_LENGTH = 6;

    private static _isValid(anEmail: string): boolean
    {
        return Email._regex.test(anEmail);
    }
    public static createFromInput(anEmail: string): Result<Email>
    {
        const notification = new Notification();
        const email = String(anEmail).trim();

        if (!Email._isValid(email))
        {
            notification.addError(Email.INVALID_FORMAT);
            return Result.fail(notification);
        }
        return Result.ok(new Email({ value: email }));
    }
    public static createFromValid(anEmail: string): Result<Email>
    {
        return Result.ok(new Email({ value: anEmail }));
    }
}
