import { Module } from "@nestjs/common";
import JWEncryptionService, {  } from "./Main/Ts/Infrastructure/Adapters/Output/JWEncryptionService";
import { IEncryptionService } from "./Main/Ts/Application/Ports/Output/IEncryptionService";
import { ISigningService } from "./Main/Ts/Application/Ports/Output/ISigningService";
import JWSigningService from "./Main/Ts/Infrastructure/Adapters/Output/JWSigningService";
import { IKeyStore } from "./Main/Ts/Application/Ports/Output/IKeyStore";
import JWKeyStore from "./Main/Ts/Infrastructure/Adapters/Output/JWKeyStore";
import { ITokenService } from "./Main/Ts/Application/Ports/Output/ITokenService";
import JWTokenService from "./Main/Ts/Infrastructure/Adapters/Output/JWTokenService";
import UserHTTPProviderInputAdapter from "./Main/Ts/Infrastructure/Adapters/Input/UserHTTPProviderInputAdapter";

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
            useClass: JWTokenService
        }
    ],
    controllers: [ UserHTTPProviderInputAdapter ]
})
export default class UsersModule
{ }
