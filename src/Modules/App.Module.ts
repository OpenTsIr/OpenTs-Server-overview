import { Module } from "@nestjs/common";
import UsersModule from "./Users/UsersModule";

@Module({
    imports: [ UsersModule ]
})
export default class AppModule
{ }
