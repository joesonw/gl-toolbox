export default class Color {
    private _opacity: number = 1.0;
    constructor(private hex: number) {}
    public get value(): number {
        return this.hex;
    }
    public set value(hex: number) {
        this.hex = hex;
    }
    public get opacity(): number {
        return this._opacity;
    }
    public set opacity(opacity: number) {
        this._opacity = opacity;
    }
    public toGl(): number[] {
        return [
            (this.hex >> 16) / 255,
            (this.hex >> 8 & 0xff) / 255,
            (this.hex & 0xff) / 255,
            this._opacity,
        ];
    }
}
