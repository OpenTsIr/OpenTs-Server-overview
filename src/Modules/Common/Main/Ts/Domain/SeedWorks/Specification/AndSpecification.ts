import Specification from "src/Modules/Common/Main/Ts/Domain/SeedWorks/Specification/Specification";

export default class AndSpecification<TEntity> extends Specification<TEntity>
{
    constructor (private readonly _left: Specification<TEntity>, private readonly _right: Specification<TEntity>)
    {
        super();
    }
    public override isSatisfiedBy(candidate: TEntity): boolean
    {
        return this._left.isSatisfiedBy(candidate) && this._right.isSatisfiedBy(candidate);
    }
    public check(candidate: TEntity)
    {
        return this.isSatisfiedBy(candidate);
    }
}
