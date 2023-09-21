import AndSpecification from "src/Modules/Common/Main/Ts/Domain/SeedWorks/Specification/AndSpecification";
import IdentitySpecification from "src/Modules/Common/Main/Ts/Domain/SeedWorks/Specification/IdentitySpecification";
import NotSpecification from "src/Modules/Common/Main/Ts/Domain/SeedWorks/Specification/NotSpecification";
import OrSpecification from "src/Modules/Common/Main/Ts/Domain/SeedWorks/Specification/OrSpecification";

export default abstract class Specification<TEntity>
{
    public abstract isSatisfiedBy(candidate: TEntity): boolean;
    public abstract check(candidate: TEntity): boolean;

    public and(specification: Specification<TEntity>): Specification<TEntity>
    {
        if (this instanceof IdentitySpecification)
        {
            return specification;
        }
        if (specification instanceof IdentitySpecification)
        {
            return this;
        }
        return new AndSpecification(this, specification);
    }
    public or(specification: Specification<TEntity>): Specification<TEntity>
    {
        if ((this instanceof IdentitySpecification) || (specification instanceof IdentitySpecification))
        {
            return [this, specification].find((spec) => (spec instanceof IdentitySpecification));
        }
        return new OrSpecification(this, specification);
    }
    public not(): Specification<TEntity>
    {
        return new NotSpecification(this);
    }
}
