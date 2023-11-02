import * as crypto from "crypto";
import Result from "src/Modules/Common/Main/Ts/Application/Result";
import ValueObject from "src/Modules/Common/Main/Ts/Domain/SeedWorks/ValueObject";

export default class UUID extends ValueObject<string>
{
    private static UUID_VALIDATOR = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

    static createEmpty(): Result<UUID>
    {
        return Result.ok(new UUID({ value: "" }));
    }
    static create(): Result<UUID>
    {
        return Result.ok(new UUID({ value: crypto.randomUUID({ disableEntropyCache: true }) }));
    }
    static fromValid(aUUID: string): Result<UUID>
    {
        return Result.ok(new UUID({ value: aUUID }));
    }
    static isValid(aUUID: string)
    {
        return new RegExp(UUID.UUID_VALIDATOR).test(aUUID);
    }
}
