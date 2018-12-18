export class Serializable {
    public ToJson(): string {
        return JSON.stringify(this);
    }
}