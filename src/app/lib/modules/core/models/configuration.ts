import { ConfigurationItem } from './configuration-item';

export class Configuration {
    private _items: Array<ConfigurationItem>;
    private _version: string;
    private _reference: string;

    constructor(reference: string, version: string, items: Array<ConfigurationItem>) {
        this._reference = reference;
        this._version = version;
        this._items = items;
    }

    public get Reference(): string {
        return this._reference;
    }

    public get Version(): string {
        return this._version;
    }

    public get Items(): Array<ConfigurationItem> {
        return this._items;
    }
}