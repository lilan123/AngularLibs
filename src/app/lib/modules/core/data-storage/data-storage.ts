import { LocalStorage } from './local-storage';
import { MemoryStorage } from './memory-storage';
import { SessionStorage } from './session-storage';
import { StorageType } from './storage-type';

export class DataStorage {

  private _localStorage: LocalStorage;
  private _sessionStorage: SessionStorage;
  private _memoryStorage: MemoryStorage;

  constructor() {
    this._localStorage = new LocalStorage();
    this._memoryStorage = new MemoryStorage();
    this._sessionStorage = new SessionStorage();
   }

  public set(key: string, value: any, location: StorageType) {
    if(location == StorageType.Local){
      if(this.isStorageAvailable(location)){
        this._localStorage.set(key, value);
      } else {
        this._memoryStorage.set(key, value);
      }
    } else if(location == StorageType.Session){
      if(this.isStorageAvailable(location)){
        this._sessionStorage.set(key, value);
      } else {
        this._memoryStorage.set(key, value);
      }
    } else {
      this._memoryStorage.set(key, value);
    }
  }

  public get(key: string, location: StorageType): any {
    if(location == StorageType.Local){
      if(this.isStorageAvailable(location)){
        return this._localStorage.get(key);
      } else {
        return this._memoryStorage.get(key);
      }
    } else if(location == StorageType.Session){
      if(this.isStorageAvailable(location)){
        return this._sessionStorage.get(key);
      } else {
        return this._memoryStorage.get(key);
      }
    } else {
      return this._memoryStorage.get(key);
    }
  }

  public isStorageAvailable(location: StorageType) : boolean {
    try {
      let now = Date.now();
      let testKey = `test-key-${now}`;
      let testValue = `test-value-${now}`;
      let locationType: Storage;
      if(location == StorageType.Local) {
        locationType = localStorage; 
      } else if(location == StorageType.Session) {
        locationType = sessionStorage;
      }
      locationType.setItem(testKey, testValue);
      let retrievedValue = locationType.getItem(testKey);
      locationType.removeItem(testKey);       
      return retrievedValue == testValue;
    } catch (error) {
      return false;
    }
  }
}