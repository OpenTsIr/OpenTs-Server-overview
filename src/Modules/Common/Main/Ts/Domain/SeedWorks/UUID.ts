import * as crypto from "crypto";
import Result from "src/Modules/Common/Main/Ts/Application/Result";
import ValueObject from "src/Modules/Common/Main/Ts/Domain/SeedWorks/ValueObject";

export default class UUID extends ValueObject<string>
{
    private static _UUID_VALIDATOR = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

    public static createEmpty(): Result<UUID>
    {
        return Result.ok(new UUID({ value: "" }));
    }
    public static create(): Result<UUID>
    {
        return Result.ok(new UUID({ value: crypto.randomUUID({ disableEntropyCache: true }) }));
    }
    public static fromValid(aUUID: string): Result<UUID>
    {
        return Result.ok(new UUID({ value: aUUID }));
    }
    public static isValid(aUUID: string): boolean
    {
        return new RegExp(UUID._UUID_VALIDATOR).test(aUUID);
    }
}
