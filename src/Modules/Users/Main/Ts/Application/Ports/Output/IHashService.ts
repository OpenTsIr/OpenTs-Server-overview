export const IHashService = Symbol("IHashService").valueOf()
export interface IHashService
{
    createHash(data: string): Promise<string>;
    compare(hash: string, data: string): Promise<boolean>;
}
