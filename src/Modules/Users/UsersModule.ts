import { Module } from "@nestjs/common";
import { IEncryptionService } from "./Main/Ts/Application/Ports/Output/IEncryptionService";
import { ISigningService } from "./Main/Ts/Application/Ports/Output/ISigningService";
import { IKeyStore } from "./Main/Ts/Application/Ports/Output/IKeyStore";
import { ITokenService } from "./Main/Ts/Application/Ports/Output/ITokenService";
import { IUserRepository } from "./Main/Ts/Application/Ports/Output/IUserRepository";
import { InMemoryUserRepository } from "./Main/Ts/Infrastructure/Adapters/Output/InMemoryUserRepository";
import { IRegisterUseCase } from "./Main/Ts/Application/UseCases/IRegisterUseCase";
import { IHashService } from "./Main/Ts/Application/Ports/Output/IHashService";
import { Argon2HashService } from "./Main/Ts/Infrastructure/Adapters/Output/Argon2HashService";
import { ILoginUseCase } from "src/Modules/Users/Main/Ts/Application/UseCases/ILoginUseCase";
import { IVerifyEmailAddressUseCase } from "src/Modules/Users/Main/Ts/Application/UseCases/IVerifyEmailAddressUseCase";
import { IConnection } from "src/Modules/Common/Main/Ts/Infrastructure/Adapters/Persistence/IConnection";
import JWKeyStore from "./Main/Ts/Infrastructure/Adapters/Output/JWKeyStore";
import JWEncryptionService, { } from "./Main/Ts/Infrastructure/Adapters/Output/JWEncryptionService";
import JWSigningService from "./Main/Ts/Infrastructure/Adapters/Output/JWSigningService";
import JWTokenService from "./Main/Ts/Infrastructure/Adapters/Output/JWTokenService";
import UserHTTPProviderInputAdapter from "./Main/Ts/Infrastructure/Adapters/Input/UserHTTPProviderInputAdapter";
import RegisterInputPort from "./Main/Ts/Application/Ports/Input/RegisterInputPort";
import LoginUseCase from "src/Modules/Users/Main/Ts/Application/Ports/Input/LoginInputPort";
import VerifyEmailAddressInputPort from "src/Modules/Users/Main/Ts/Application/Ports/Input/VerifyEmailAddressInputPort";
import PostgresqlConnection from "src/Modules/Users/Main/Ts/Infrastructure/Adapters/Output/Persistence/Postgresql/PostgresqlConnection";
import UserDomainModelToPersistence from "src/Modules/Users/Main/Ts/Infrastructure/Adapters/Output/Persistence/Mappers/UserDomainModelToPersistence";
import UserPersistenceModelToDomain from "src/Modules/Users/Main/Ts/Infrastructure/Adapters/Output/Persistence/Mappers/UserPersistenceModelToDomain";

@Module
    ({
        providers: [
            {
                provide: IEncryptionService,
                useClass: JWEncryptionService
            },
            {
                provide: ISigningService,
                useClass: JWSigningService
            },
            {
                provide: IKeyStore,
                useClass: JWKeyStore
            },
            {
                provide: ITokenService,
                useClass: JWTokenService,
            },
            {
                provide: IRegisterUseCase,
                useClass: RegisterInputPort
            },
            {
                provide: IUserRepository,
                useClass: InMemoryUserRepository
            },
            {
                provide: IHashService,
                useClass: Argon2HashService
            },
            {
                provide: ILoginUseCase,
                useClass: LoginUseCase
            },
            {
                provide: IVerifyEmailAddressUseCase,
                useClass: VerifyEmailAddressInputPort
            },
            {
                provide: IConnection,
                useClass: PostgresqlConnection
            },
            UserDomainModelToPersistence,
            UserPersistenceModelToDomain
        ],
        controllers: [ UserHTTPProviderInputAdapter ]
    })
export default class UsersModule
{ }
