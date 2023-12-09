import { BadRequestException } from "@nestjs/common";
import Specification from "src/Modules/Common/Main/Ts/Domain/SeedWorks/Specification/Specification";
import User from "src/Modules/Users/Main/Ts/Domain/UserAggregate/User";
import UserStatus from "src/Modules/Users/Main/Ts/Domain/UserStatus";

export class VerifiedSpecification extends Specification<User>
{
    public isSatisfiedBy(entity: User): boolean
    {
        if (entity.status === UserStatus.EMAIL_VERIFIED)
        {
            if (
                (entity.email == null) ||
                (entity.nickname === null) ||
                (entity.password === null) ||
                (entity.role === null) ||
                (entity.emailVerificationToken === null) ||
                (entity.emailVerificationTokenIssuedAt === null) ||
                (entity.createdAt === null) ||
                (entity.updatedAt === null)
            )
            {
                throw new BadRequestException("امکان پردازش درخواست وجود ندارد");
            }
        }
        return true;
    }
    public check(entity: User): boolean
    {
        return this.isSatisfiedBy(entity);
    }

}
