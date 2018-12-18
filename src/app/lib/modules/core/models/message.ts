import { Serializable } from './serializable';

export class Message extends Serializable {
    Type: string;
    Payload: string;
}