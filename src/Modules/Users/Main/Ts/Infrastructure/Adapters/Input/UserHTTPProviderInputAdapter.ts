import { Controller, Get, Inject, Param } from "@nestjs/common";
import { ITokenService } from "../../../Application/Ports/Output/ITokenService";

@Controller()
export default class UserHTTPProviderInputAdapter
{
    constructor (@Inject(ITokenService) private _tokenService: ITokenService)
    { }
    @Get("/:username")
    async login (@Param("username") username: string)
    {
        console.time("benchmark")
        
        const token = await this._tokenService.create(JSON.stringify({ username }))
        
        console.log(token)
        
        const data = await this._tokenService.validate(token)
        
        console.log(data)
        console.timeEnd("benchmark")
    }
}
