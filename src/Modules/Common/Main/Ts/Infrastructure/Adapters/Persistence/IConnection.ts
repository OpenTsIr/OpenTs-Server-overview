import { PoolClient } from "pg";

export const IConnection = Symbol("IConnection").valueOf();
export interface IConnection
{
    getConnection(): Promise<PoolClient>;
    releaseConnection(): void;
    isConnectionHealthy(): Promise<boolean>;
}
