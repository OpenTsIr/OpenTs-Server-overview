export const IUnitOfWork = Symbol("IUnitOfWork").valueOf();
export interface IUnitOfWork
{
    startTransaction(): Promise<void>;
    rollbackTransaction(): Promise<void>;
    commitTransaction(): Promise<void>;
}
