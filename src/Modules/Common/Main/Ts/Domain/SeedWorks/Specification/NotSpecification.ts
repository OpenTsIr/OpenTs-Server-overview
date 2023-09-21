import Specification from "src/Modules/Common/Main/Ts/Domain/SeedWorks/Specification/Specification";

export default class NotSpecification<TEntity> extends Specification<TEntity>
{
    constructor (private readonly _specification: Specification<TEntity>)
    {
        super();
    }
    public override isSatisfiedBy(candidate: TEntity): boolean
    {
        return !this._specification.isSatisfiedBy(candidate);
    }
    public check(candidate: TEntity)
    {
        return this.isSatisfiedBy(candidate);
    }
}
