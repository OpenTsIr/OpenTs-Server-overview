import Result from "src/Modules/Common/Main/Ts/Application/Result";

export default interface IQueryHandler<IQuery = {}, Dto = {}>
{
    handleQuery(query: IQuery): Promise<Result<Dto>>;
}
