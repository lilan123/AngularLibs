import { Injector } from '@angular/core';

export class CoreHelper {
    public static Injector : Injector = null;

    public static Parse<T>(data: string): T {
        return <T>JSON.parse(data);
    }
}