import { Subscription } from 'rxjs/Rx';

import { Channel } from './channel';
import { Message } from '../models';
import { CoreHelper } from '../helpers';
import { ConnectionStatus, TransferState } from '../enums';
import { ConfigurationManager } from '../system-configuration';
import { ConfigurationService } from '../services/configuration.service';

export class Duplex extends Channel<Message> {
    private _configurationManager: ConfigurationManager;
    private _autoReconnectInterval: number = 5000;
    private _autoReconnect: boolean = false;
    private _status: ConnectionStatus;
    private _websocket: WebSocket;
    private _sub: Subscription;
    
    constructor(path: string) {
        super(path);
        this._status = ConnectionStatus.Default;
        this._configurationManager = CoreHelper.Injector.get(ConfigurationService);
        this.init();
    }

    // [TODO] apply logic if already connected
    public Connect() {
        if(this._status != ConnectionStatus.Connecting) {
            this._status = ConnectionStatus.Connecting;
            this._websocket = this.wsCreate(this._path);
        }
    }

    // [TODO] send only if the connection is stable
    public Send(message: Message) {
        this._transferState = TransferState.Sending;
        this._websocket.send(message.ToJson());
    }

    public get Status(): ConnectionStatus {
        return this._status
    }

    private init() {
        if(this._configurationManager.IsLoaded)
            this.loadSettings();
        else {
            this._sub = this._configurationManager.OnLoad.subscribe(isSuccess => {
                if(isSuccess)
                    this.loadSettings();

                this._sub.unsubscribe();
            });
        }
    }

    private loadSettings() {
        let group = "Duplex";
        let autoReconnectInterval = "AutoReconnectInterval";

        this._autoReconnect = (this._configurationManager.Get(group, "AutoReconnect") == "True");
        let interval = this._configurationManager.Get(group, autoReconnectInterval);

        if(!isNaN(Number(interval)))
            this._autoReconnectInterval = Number(this._configurationManager.Get(group, autoReconnectInterval))
    }

    private wsReconnect() {
        if(this._status != ConnectionStatus.Reconnecting) {
            this._status = ConnectionStatus.Reconnecting;
            this._websocket = null;

            console.log("disconnected, reconnecting...");
            setTimeout(this.Connect.bind(this), this._autoReconnectInterval);
        }
    }

    private wsClose() {
        if(this._autoReconnect)
            this.wsReconnect();
    }

    private wsError() {
        if(this._autoReconnect)
            this.wsReconnect();
    }

    private wsOpen() {
        this._status = ConnectionStatus.Connected;
    }

    private wsMessage(response: MessageEvent) {
        this._transferState = TransferState.Arrived;
        this.publish(CoreHelper.Parse<Message>(response.data));
    }

    private wsCreate(path: string): WebSocket {
        let ws = new WebSocket(path);
        ws.onmessage = this.wsMessage.bind(this);
        ws.onclose = this.wsClose.bind(this);
        ws.onerror = this.wsError.bind(this);
        ws.onopen = this.wsOpen.bind(this);
        return ws;
    }
}