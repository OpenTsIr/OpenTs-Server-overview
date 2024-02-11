import { Module, OnModuleInit } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { migration } from "src/Modules/Users/Main/Postgresql/Migrate";
import UsersModule from "./Users/UsersModule";

@Module({
    imports: [
        UsersModule,
        ConfigModule.forRoot({ envFilePath: [ ".env.development.local", ".env.development", ".env" ] })
    ]
})
export default class AppModule implements OnModuleInit
{
    public async onModuleInit(): Promise<void>
    {
        await migration();
    }
}
