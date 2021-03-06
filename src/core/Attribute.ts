import gl from 'core/gl';
import Constants from 'core/Constants';

export default class Attribute {
    protected updated: boolean = true;
    protected dataSize: number;
    protected _buffer: ArrayBuffer;
    protected _target: Constants.AttributeTarget;
    protected _bufferPointer: WebGLBuffer;
    protected _usage: Constants.AttributeUsage = gl.STATIC_DRAW;
    protected _normalized: boolean = false;
    protected _stride: number = 0;
    protected _offset: number = 0;
    protected _type: Constants.AttributeType;

    constructor(
        target: Constants.AttributeTarget,
        buffer: ArrayBuffer,
        type: Constants.AttributeType,
        dataSize: number
    ) {
        this._target = target;
        this._type = type;
        this._buffer = buffer;
        this.dataSize = dataSize;
    }

    public get needsUpdate(): boolean {
        return this.updated;
    }

    public get buffer(): WebGLBuffer {
        return this._bufferPointer;
    }

    set(index: number, ...data: number[]): void {
        if (data.length > this.dataSize) {
            throw new Error(`This attribute is for ${this.dataSize}-byte size array`);
        }
        for (let i = 0; i < data.length; i++) {
            this._buffer[index * this.dataSize + i] = data[i];
        }
        this.updated = true;
    }

    get(index: number): number[] {
        const result: number[] = [];
        for (let i = 0; i < this.dataSize; i++) {
            result.push(this._buffer[index * this.dataSize + i]);
        }
        return result;
    }

    replaceWith(buffer: ArrayBuffer): void {
        this._buffer = buffer;
    }

    update(loc: number): void {
        if (!this._bufferPointer) {
            this._bufferPointer = gl.createBuffer();
        }
        gl.bindBuffer(this._target, this._bufferPointer);
        gl.bufferData(this._target, this._buffer, this._usage);
        gl.vertexAttribPointer(
            loc,
            this.dataSize,
            this._type,
            this._normalized,
            this._stride,
            this._offset
        );
        this.updated = false;
    }
}
