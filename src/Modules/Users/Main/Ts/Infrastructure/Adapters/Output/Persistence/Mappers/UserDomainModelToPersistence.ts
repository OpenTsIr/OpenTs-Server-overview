import { Mapper, MappingProfile, createMap, forMember, mapFrom } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import User from "src/Modules/Users/Main/Ts/Domain/UserAggregate/User";
import UserPersistenceModel from "src/Modules/Users/Main/Ts/Infrastructure/Adapters/Output/Persistence/Models/UserPersistenceModel";

@Injectable()
export default class UserDomainModelToPersistence extends AutomapperProfile
{
    public constructor (@InjectMapper() mapper: Mapper)
    {
        super(mapper);
    }
    // eslint-disable-next-line accessor-pairs
    public get profile(): MappingProfile
    {
        return function (mapper)
        {
            createMap(mapper, User, UserPersistenceModel,
                forMember((destination) => destination.id, mapFrom((source) => source.id.value)),
                forMember((destination) => destination.email, mapFrom((source) => source.email.value)),
                forMember((destination) => destination.password, mapFrom((source) => source.password.value)),
                forMember((destination) => destination.nickname, mapFrom((source) => source.nickname.value)),
                forMember((destination) => destination.role, mapFrom((source) => source.role)),
                forMember((destination) => destination.resetPasswordToken, mapFrom((source) => source.resetPasswordToken?.value ?? "")),
                forMember((destination) => destination.resetPasswordTokenIssuedAt, mapFrom((source) => source.resetPasswordTokenIssuedAt ?? "")),
                forMember((destination) => destination.emailVerificationToken, mapFrom((source) => source.emailVerificationToken.value)),
                forMember((destination) => destination.emailVerificationTokenIssuedAt, mapFrom((source) => source.emailVerificationTokenIssuedAt)),
                forMember((destination) => destination.status, mapFrom((source) => source.status)),
                forMember((destination) => destination.createdAt, mapFrom((source) => source.createdAt)),
                forMember((destination) => destination.updatedAt, mapFrom((source) => source.updatedAt)),
                forMember((destination) => destination.concurrencyVersion, mapFrom((source) => source.concurrencyVersion)),
            );
        };
    }
}
