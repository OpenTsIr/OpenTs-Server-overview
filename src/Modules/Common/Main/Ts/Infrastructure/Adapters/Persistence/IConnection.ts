export const IConnection = Symbol("IConnection").valueOf();
export interface IConnection<Pool>
{
    get connection(): Promise<Pool>;
    get pool(): Pool;
    setupConnectionPool(): Promise<void>;
}