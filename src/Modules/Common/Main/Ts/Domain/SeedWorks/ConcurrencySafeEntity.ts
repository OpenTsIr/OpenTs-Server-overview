import Entity from "src/Modules/Common/Main/Ts/Domain/SeedWorks/Entity";
import UUID from "src/Modules/Common/Main/Ts/Domain/SeedWorks/UUID";

export default abstract class ConcurrencySafeEntity<TId extends UUID> extends Entity<TId>
{
    private _concurrencyVersion: number = 1;

    public get concurrencyVersion(): number
    {
        return this._concurrencyVersion;
    }
    protected set concurrencyVersion(aNewValue: number)
    {
        // if (this.concurrencyVersion !== null)
        // {
        //     this.failWhenConcurrencyViolation(aNewValue);
        // }
        this._concurrencyVersion = aNewValue;
    }
    // public failWhenConcurrencyViolation(aVersion: UUID): void
    // {
    //     if (!aVersion.equals(this.concurrencyVersion))
    //     {
    //         throw new UnprocessableEntityException("Concurrency Violation: Stale data detected. Entity was already modified.");
    //     }
    // }
}
