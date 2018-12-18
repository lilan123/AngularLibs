import { Subscription } from 'rxjs/Rx';

import { RawConfiguration } from './models/raw-configuration';
import { ConfigurationItem, Configuration, Loadable } from '../models';
import { OneWay } from '../data-access/one-way';

export class ConfigurationManager extends Loadable<boolean> {
    private _config: Configuration;
    private _sub: Subscription;

    constructor() {
        super();
        this.init();
    }

    public get Configuration(): Configuration {
        return this._config;
    }

    public get Reference(): string {
        return this._config.Reference;
    }

    public get Version(): string {
        return this._config.Version;
    }

    public get Items(): Array<ConfigurationItem> {
        return this._config.Items;
    }

    public Exists(group: string, name: string): boolean {
        return this._config.Items.some(item => item.Group == group && item.Name == name);
    }

    public Get(group: string): Array<ConfigurationItem>;
    public Get(group: string, name: string): string;
    public Get(group: string, name?: string): any {
        if(name == null)
            return this._config.Items.filter(item => item.Group == group);
        else {
            let value = "";
            if(this._config.Items.some(item => item.Group == group && item.Name == name))
                value = this._config.Items.find(item => item.Group == group && item.Name == name).Value;

            return value;
        }
    }

    private init() {
        let oneway = new OneWay<RawConfiguration>("/assets/configuration.json");
        this._sub = oneway.Arrived.subscribe(config => {
            let items = Array<ConfigurationItem>();
            config.Items.forEach(item => {
                items.push(new ConfigurationItem(item.Group, item.Name, item.Value));
            });
            this._config = new Configuration(config.Reference, config.Version, items);
            this.setLoaded(true);
            this._sub.unsubscribe();
        });

        oneway.Get();
    }
}