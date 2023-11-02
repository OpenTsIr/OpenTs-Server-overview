import Password from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Password";

describe("Password ValueObject", () =>
{
    it("returns a failed result if input is an empty string", () =>
    {
        const password = Password.createFromInput("");

        expect(password.isFailure()).toBe(true);
    });
    it("returns a failed result if input length is less than 8", () =>
    {
        const password = Password.createFromInput("ali");

        expect(password.isFailure()).toBe(true);
    });
    it("returns a failed result if input length is greater than 20", () =>
    {
        const password = Password.createFromInput("alialialialialialiali");
        
        expect(password.isFailure()).toBe(true);
    });
    it("returns a successful result if input has a length between 8-20 chars", () =>
    {
        const password = Password.createFromInput("bahmanbs");

        expect(password.isSuccess()).toBe(true);
    });
});
