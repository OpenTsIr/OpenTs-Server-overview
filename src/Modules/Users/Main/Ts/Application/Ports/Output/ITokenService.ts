export const ITokenService = Symbol("ITokenService").valueOf();

export interface ITokenService
{
    create(data: string): Promise<string>;
    validate(token: string): Promise<string>;
}