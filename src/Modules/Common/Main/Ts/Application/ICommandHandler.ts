import Result from "./Result";

export interface ICommandHandler<ICommand>
{
    handle(command: ICommand): Result<void> | Promise<Result<void>>;
}
