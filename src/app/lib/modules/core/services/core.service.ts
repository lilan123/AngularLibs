import { Injectable, Injector } from '@angular/core';
import { CoreHelper } from '../helpers';
import { DataAccessFacade } from '../data-access';
import { ConfigurationManager } from '../system-configuration';
import { DataStorage } from '../data-storage/data-storage';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class CoreService {
    private _configurationManager: ConfigurationManager;
    private _dataStorage: DataStorage; 
    private _dataAccess: DataAccessFacade;

    constructor(injector: Injector) {
        CoreHelper.Injector = injector;

        this._configurationManager = CoreHelper.Injector.get(ConfigurationService);
        this._dataAccess = new DataAccessFacade();
        this._configurationManager = new ConfigurationManager();
        this._dataStorage = new DataStorage();
    }

    public get DataAccess(): DataAccessFacade {
        return this._dataAccess;
    }

    public get Configuration(): ConfigurationManager {
        return this._configurationManager;
    }

    public get DataStorage(): DataStorage {
        return this._dataStorage;
    }
}