import { mat2 }from 'gl-matrix';
import Vector2 from './Vector2';

export default class Matrix2 {
    private instance: mat2;
    constructor(a: number | Vector2, b: number | Vector2, c?: number, d?: number) {
        if ((a instanceof Vector2) && (b instanceof Vector2)) {
            this.instance = mat2.fromValues(a.x, a.y, b.x, b.y);
        } else {
            this.instance = mat2.fromValues(<number>a, <number>b, c, d);
        }
    }
    det(): number {
        return mat2.determinant(this.instance);
    }
}
