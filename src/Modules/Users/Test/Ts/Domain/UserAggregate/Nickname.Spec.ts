import Nickname from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Nickname";

describe("Nickname ValueObject", () =>
{
    it("returns a failed result if input is an empty string", () =>
    {
        const nickname = Nickname.createFromInput("");

        expect(nickname.isFailure()).toBe(true);
    });
    it("returns a failed result if input length is less than 4", () =>
    {
        const nickname = Nickname.createFromInput("ali");

        expect(nickname.isFailure()).toBe(true);
    });
    it("returns a failed result if input length is greater than 20", () =>
    {
        const nickname = Nickname.createFromInput("alialialialialialiali");
        
        expect(nickname.isFailure()).toBe(true);
    });
    it("returns a successful result if input has a length between 4-20 chars", () =>
    {
        const nickname = Nickname.createFromInput("bahmanbs");

        expect(nickname.isSuccess()).toBe(true);
    });
});
