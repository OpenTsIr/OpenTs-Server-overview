import Email from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Email";

describe("Email ValueObject", () =>
{
    it("returns a failed result if input is an empty string", () =>
    {
        const email = Email.createFromInput("");
        
        expect(email.isFailure()).toBe(true);
    });
    it("returns a failed result if input containes no @", () =>
    {
        const email = Email.createFromInput("gmail.com");
        
        expect(email.isFailure()).toBe(true);
    });
    it("returns a failed result if input has a postfix of less than 2 chars", () =>
    {
        const email = Email.createFromInput("a@a.c");

        expect(email.isFailure()).toBe(true);
    });
    it("returns a successful result if input has a length of egt 6 including atleast 2 chars in postfix", () =>
    {
        const email = Email.createFromInput("a@b.cd");

        expect(email.isSuccess()).toBe(true);
    });
});
