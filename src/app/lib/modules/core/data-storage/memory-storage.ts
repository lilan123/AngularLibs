export class MemoryStorage {
    private storage: Object = new Object();

    public set(key: string, value: any) {
        this.storage[key] = value;
    }

    public get(key: string): any {
        if(this.storage[key]) {
            return this.storage[key];
        } else {
            return null;
        }           
    }
}