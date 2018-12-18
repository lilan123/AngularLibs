import { Observable, Subscriber } from 'rxjs/Rx';

export class Loadable<T> {
    public OnLoad: Observable<T>;
    private _loader: Subscriber<T>;
    private _isLoaded: boolean;

    constructor() {
        this.OnLoad = new Observable(obs => { this._loader = obs; });
        this._isLoaded = false;
    }

    public get IsLoaded(): boolean {
        return this._isLoaded;
    }

    protected setLoaded(data: T) {
        if(this._loader != null) {
            this._loader.next(data);
            this._isLoaded = true;
        }
    }
}