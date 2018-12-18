export class SessionStorage {
    public set(key: string, value: any) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    public get(key: string): any {
        return JSON.parse(sessionStorage.getItem(key)); 
    }
}