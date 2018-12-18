export class ConfigurationItem {
    private _group: string;
    private _name: string;
    private _value: string;

    constructor(group: string, name: string, value: string) {
        this._group = group;
        this._name = name;
        this._value = value;
    }

    public get Group(): string {
        return this._group;
    }

    public get Name(): string {
        return this._name;
    }

    public get Value(): string {
        return this._value;
    }
}