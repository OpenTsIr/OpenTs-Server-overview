import UUID from "src/Modules/Common/Main/Ts/Domain/SeedWorks/UUID";
import ResetPasswordToken from "src/Modules/Users/Main/Ts/Domain/UserAggregate/ResetPasswordToken";

describe("ResetPasswordToken ValueObject", () =>
{
    it("creates a valid UUID v4", () =>
    {
        const uuidv4 = ResetPasswordToken.create().value;
        
        expect(ResetPasswordToken.isValid(uuidv4.value)).toBe(true);
    });
    it("creates a value object of type UUID whitout any validation", () =>
    {
        const uuidv4 = ResetPasswordToken.create().value;

        const UUIDV4 = ResetPasswordToken.fromValid(uuidv4.value).value;

        expect(UUIDV4).toBeInstanceOf(UUID);
    });
    it("values remain the same while creating and recreating from valid one", () =>
    {
        const uuidv4 = ResetPasswordToken.create().value;

        const UUIDV4 = ResetPasswordToken.fromValid(uuidv4.value).value;

        expect(UUIDV4.value).toEqual(uuidv4.value);
        expect(UUIDV4.equals(uuidv4)).toBe(true)
    });
});