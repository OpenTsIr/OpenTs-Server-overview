export const ITokenService = Symbol("ITokenService");
export interface ITokenService
{
    create(data: string): string;
    extract(token: string): string;
}