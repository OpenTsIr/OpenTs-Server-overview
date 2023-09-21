import Notification from "src/Modules/Common/Main/Ts/Application/Notification";
import Result from "src/Modules/Common/Main/Ts/Application/Result";
import ValueObject from "src/Modules/Common/Main/Ts/Domain/SeedWorks/ValueObject";

export default class Nickname extends ValueObject<string>
{
    static NICKNAME_COULD_NOT_BE_AN_EMPTY_STRING = "نام نمایشی نمیتواند خالی باشد";
    static INVALID_LENGTH = "نام نمایشی باید بین ۴ الی ۲۰ کاراکتر باشد";

    static createFromInput(aNickname: string): Result<Nickname>
    {
        const notification = new Notification();
        const nickname = String(aNickname).trim();

        if (nickname.length === 0)
        {
            notification.addError(Nickname.NICKNAME_COULD_NOT_BE_AN_EMPTY_STRING);
        }
        if ((nickname.length < 4) || (nickname.length > 20))
        {
            notification.addError(Nickname.INVALID_LENGTH);
        }
        if (notification.hasErrors())
        {
            return Result.fail(notification);
        }
        return Result.ok(new Nickname({ value: nickname }));
    }
}
 