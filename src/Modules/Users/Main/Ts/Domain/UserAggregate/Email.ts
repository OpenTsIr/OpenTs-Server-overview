import Result from "src/Modules/Common/Main/Ts/Application/Result";
import Notification from "src/Modules/Common/Main/Ts/Application/Notification";
import ValueObject from "src/Modules/Common/Main/Ts/Domain/SeedWorks/ValueObject";

export default class Email extends ValueObject<string>
{
    private static Regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    static INVALID_FORMAT = "فرمت ایمیل وارد شده معتبر نیست";
    static MINIMUM_LENGTH = 6;

    private static isValid(anEmail: string): boolean
    {
        return Email.Regex.test(anEmail);
    }
    static createFromInput(anEmail: string): Result<Email>
    {
        const notification = new Notification();
        const email = String(anEmail).trim();

        if (!Email.isValid(email))
        {
            notification.addError(Email.INVALID_FORMAT);
            return Result.fail(notification);
        }
        return Result.ok(new Email({ value: email }));
    }
    static createFromValid(anEmail: string): Result<Email>
    {
        return Result.ok(new Email({ value: anEmail }));
    }
}
