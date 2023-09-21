import Notification from "src/Modules/Common/Main/Ts/Application/Notification";
import Result from "src/Modules/Common/Main/Ts/Application/Result";
import UUID from "src/Modules/Common/Main/Ts/Domain/SeedWorks/UUID";

export default class UserId extends UUID
{
    static createFromInput(aUUID: string): Result<UserId>
    {
        const notification = new Notification();
        const uuid = String(aUUID).trim();

        if (!UserId.isValid(uuid))
        {
            notification.addError("شناسه کاربر معتبر نیست");
            return Result.fail(notification);
        }
        return Result.ok(new UserId({ value: uuid }));
    }
}
 