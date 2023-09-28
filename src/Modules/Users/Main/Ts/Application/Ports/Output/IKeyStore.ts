export const IKeyStore = Symbol("IKeyStore");
export default interface IKeyStore
{
    generate(): void;
}
