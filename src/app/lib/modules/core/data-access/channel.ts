import { Observable, Subscriber } from 'rxjs/Rx';

import { ConnectionStatus, TransferState } from '../enums';

export abstract class Channel<T> {
  public Arrived: Observable<T>;

  protected _transferState: TransferState;
  protected _path: string;
  private _dataSender: Subscriber<T>;

  constructor(path: string) {
    this._path = path;
    this._transferState = TransferState.Default;
    this.Arrived = new Observable(obs => { this._dataSender = obs; });
  }

  public get TransferState(): TransferState {
    return this._transferState;
  }

  protected publish(data: T): void;
  protected publish(error: string): void;
  protected publish(param: T | string): void {
    if(this._dataSender != null) {
      if(typeof param === 'string') {
        this._dataSender.error(param);
        this._transferState = TransferState.Error;
      }
      else {
        this._dataSender.next(param);
        this._transferState = TransferState.Arrived;
      }
    }
  }
}