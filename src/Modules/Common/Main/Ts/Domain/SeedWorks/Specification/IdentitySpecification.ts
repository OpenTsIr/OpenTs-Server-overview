import Specification from "src/Modules/Common/Main/Ts/Domain/SeedWorks/Specification/Specification";

export default class IdentitySpecification<TEntity> extends Specification<TEntity>
{
    public check(): boolean
    {
        return true;
    }
    public override isSatisfiedBy(): boolean
    {
        return true;
    }
}
