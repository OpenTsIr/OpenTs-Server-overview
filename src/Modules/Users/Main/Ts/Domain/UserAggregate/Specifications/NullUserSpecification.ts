import Specification from "src/Modules/Common/Main/Ts/Domain/SeedWorks/Specification/Specification";
import NullUser from "src/Modules/Users/Main/Ts/Domain/UserAggregate/NullUser";
import User from "src/Modules/Users/Main/Ts/Domain/UserAggregate/User";

export default class NullUserSpecification extends Specification<User>
{
    public isSatisfiedBy(entity: User): boolean
    {
        return entity instanceof NullUser;
    }
    public check(entity: User): boolean
    {
        return this.isSatisfiedBy(entity);
    }
}
