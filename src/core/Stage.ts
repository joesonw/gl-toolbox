import gl from 'core/gl';
import Drawable from 'core/Drawable';
import Constants from 'core/Constants';
import Uniform from 'core/Uniform';

export default class Stage {
    private _children: Drawable[] = [];

    constructor() {

    }

    public get children(): Drawable[] {
        return this._children;
    }

    public add(child: Drawable): void {
        this._children.push(child);
    }

    public remove(child: Drawable): void {
        const index = this._children.indexOf(child);
        if (index !== -1) {
            this._children.splice(index, 1);
        }
    }

    clear() {
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    render() {
        const viewport = new Uniform(Uniform.FLOAT, 2);
        viewport.set(gl.canvas.width,  gl.canvas.height);

        for (const child of this._children) {
            gl.useProgram(child.program);
            child.update(viewport);
            gl.drawArrays(child.drawType, child.startIndex, child.endIndex);
        }
    }
}
