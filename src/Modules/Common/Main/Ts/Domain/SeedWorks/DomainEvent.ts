import UUID from "src/Modules/Common/Main/Ts/Domain/SeedWorks/UUID";

export default abstract class DomainEvent
{
    public occuredOn: Date = new Date();
    public id: UUID = UUID.create().value;
    public type: string = this.constructor.name;
}