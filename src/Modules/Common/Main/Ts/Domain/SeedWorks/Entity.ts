import UUID from "src/Modules/Common/Main/Ts/Domain/SeedWorks/UUID";
import IdentifiedDomainObject from "src/Modules/Common/Main/Ts/Domain/SeedWorks/IdentifiedDomainObject";
import DomainEvent from "src/Modules/Common/Main/Ts/Domain/SeedWorks/DomainEvent";

export default abstract class Entity<TId extends UUID> extends IdentifiedDomainObject<TId>
{
    private _events: Set<DomainEvent> = new Set();

    public addEvent(event: DomainEvent): void
    {
        this._events.add(event);
    }
    public clearEvent(): void
    {
        this._events.clear();
    }
    public getEvents(): Set<DomainEvent>
    {
        return this._events;
    }
    public equals(anEntity: Entity<TId>)
    {
        if (this === anEntity)
        {
            return true;
        }
        if ((anEntity instanceof Entity) && (this.id === anEntity.id))
        {
            return true;
        }
        return false;
    }
    public abstract validateInvariant(): void;
}
