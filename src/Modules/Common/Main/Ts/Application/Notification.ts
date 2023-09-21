export default class Notification
{
    private errors: string[] = [];

    public addError(message: string): void
    {
        this.errors.push(message);
    }
    public hasErrors(): boolean
    {
        return this.errors.length > 0;
    }
    public getErrors(): string[]
    {
        return [...this.errors];
    }
    public combineWith(other: Notification): void
    {
        this.errors.push(...other.getErrors());
    }
    public combineAll(...notifications: Notification[]): void
    {
        for (const notification of notifications)
        {
            this.combineWith(notification);
        }
    }
    public errorMessage(): string
    {
        return this.errors.join(", ");
    }
    public getMessages(): string[]
    {
        return this.errors;
    }
}
