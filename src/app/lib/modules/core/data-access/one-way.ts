import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs/Rx';

import { Channel } from './channel';
import { TransferState } from '../enums';
import { CoreHelper } from '../helpers';

export class OneWay<T> extends Channel<T> {
    private _httpClient: HttpClient;
    private _sub: Subscription;

    constructor(path: string) {
        super(path);
        this._httpClient = CoreHelper.Injector.get(HttpClient);
    }

    // [TODO] consider queue
    public Post(data?: any) {
        if(this._transferState != TransferState.Requesting) {
            this._transferState = TransferState.Requesting;
            this._sub = this._httpClient.post(this._path, data).subscribe((item: T) => {
                this.publish(item);
                this._sub.unsubscribe();
            }, err => {
                this.publish("error: " + this._path);
                this._sub.unsubscribe();
            });
        }
    }

    // [TODO] consider queue
    public Get() {
        if(this._transferState != TransferState.Requesting) {
            this._transferState = TransferState.Requesting;
            this._sub = this._httpClient.get<T>(this._path).subscribe(data => {
                this.publish(data);
                this._sub.unsubscribe();
            }, err => {
                this.publish("error: " + this._path);
                this._sub.unsubscribe();
            });
        }
    }
}