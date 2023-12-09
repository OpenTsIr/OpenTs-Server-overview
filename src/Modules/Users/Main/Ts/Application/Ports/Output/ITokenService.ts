export const ITokenService = Symbol("ITokenService").valueOf();

export interface ITokenService
{
    create(data: string): Promise<{ accessToken: string, refreshToken: string; }>;
    validate(token: string): Promise<string>;
}