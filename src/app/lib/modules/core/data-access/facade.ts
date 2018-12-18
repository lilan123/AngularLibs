import { Observable } from 'rxjs/Rx';

import { Message } from '../models';
import { Duplex } from './duplex';
import { OneWay } from './one-way';

export class DataAccessFacade {
    public Post<T>(path: string, data?: any): Observable<T> {
        let oneway = new OneWay<T>(path);
        oneway.Post(data);
        return oneway.Arrived;
    }

    public Get<T>(path: string): Observable<T> {
        let oneway = new OneWay<T>(path);
        oneway.Get();
        return oneway.Arrived;
    }

    public Create<T>(path: string): OneWay<T>;
    public Create(path: string, autoStart: boolean): Duplex;
    public Create<T>(path: string, autoStart?: boolean): any {
        if(autoStart == null)
            return new OneWay<T>(path);
        else {
            let duplex = new Duplex(path);
            if(autoStart)
                duplex.Connect();
                
            return duplex;
        }
    }
}