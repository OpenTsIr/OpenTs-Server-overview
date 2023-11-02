import { shallowEqual } from "shallow-equal-object";

interface IProps<TValue>
{
    value: TValue;
}
export default class ValueObject<T>
{
    private _props: Readonly<IProps<T>>;

    public get value()
    {
        return this._props.value;
    }
    public equals(valueObject: ValueObject<T>): boolean
    {
        return shallowEqual(this._props, valueObject._props);
    }
    protected constructor (value: IProps<T>)
    {
        this._props = Object.freeze(value);
    }
}
