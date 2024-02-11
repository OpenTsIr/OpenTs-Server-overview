import { Mapper, MappingProfile, createMap, forMember, mapFrom } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import Email from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Email";
import EmailVerificationToken from "src/Modules/Users/Main/Ts/Domain/UserAggregate/EmailVerificationToken";
import Nickname from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Nickname";
import Password from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Password";
import ResetPasswordToken from "src/Modules/Users/Main/Ts/Domain/UserAggregate/ResetPasswordToken";
import Roles from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Roles";
import User from "src/Modules/Users/Main/Ts/Domain/UserAggregate/User";
import UserId from "src/Modules/Users/Main/Ts/Domain/UserAggregate/UserId";
import UserStatus from "src/Modules/Users/Main/Ts/Domain/UserStatus";
import UserPersistenceModel from "src/Modules/Users/Main/Ts/Infrastructure/Adapters/Output/Persistence/Models/UserPersistenceModel";

@Injectable()
export default class UserPersistenceModelToDomain extends AutomapperProfile
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
            createMap(mapper, UserPersistenceModel, User,
                forMember((destination) => destination.id, mapFrom((source) => UserId.fromValid(source.id).value)),
                forMember((destination) => destination.email, mapFrom((source) => Email.createFromValid(source.email).value)),
                forMember((destination) => destination.password, mapFrom((source) => Password.createFromValid(source.password).value)),
                forMember((destination) => destination.nickname, mapFrom((source) => Nickname.createFromValid(source.nickname).value)),
                forMember((destination) => destination.role, mapFrom((source) => Roles[ source.role ])),
                forMember((destination) => destination.resetPasswordToken, mapFrom((source) => !!source.resetPasswordToken ? ResetPasswordToken.fromValid(source.resetPasswordToken).value : "")),
                forMember((destination) => destination.resetPasswordTokenIssuedAt, mapFrom((source) => !!source.resetPasswordTokenIssuedAt ? new Date(source.resetPasswordTokenIssuedAt) : "")),
                forMember((destination) => destination.emailVerificationToken, mapFrom((source) => EmailVerificationToken.fromValid(source.emailVerificationToken).value)),
                forMember((destination) => destination.emailVerificationTokenIssuedAt, mapFrom((source) => new Date(source.emailVerificationTokenIssuedAt))),
                forMember((destination) => destination.status, mapFrom((source) => UserStatus[ source.status ])),
                forMember((destination) => destination.createdAt, mapFrom((source) => new Date(source.createdAt))),
                forMember((destination) => destination.updatedAt, mapFrom((source) => new Date(source.updatedAt))),
                forMember((destination) => destination.concurrencyVersion, mapFrom((source) => source.concurrencyVersion)),
            );
        };
    }
}
