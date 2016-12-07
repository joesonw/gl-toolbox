import gl from 'core/gl';
import AbstractUniform from 'core/AbstractUniform';
import Attribute from 'core/Attribute';
import Constants from 'core/Constants';
import Uniform from 'core/Uniform';

const commonVertexShader = require('shaders/vertex/common.glsl');
const commonFragmentShader = require('shaders/fragment/common.glsl');

function pad(str: number, size: number): string {
    return (<any>' ').repeat(size).slice(0, size - str.toString().length) + str;
}

function createShader(type: number, source: string): WebGLShader {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const size = source.split('\n').length.toString().length;
        console.warn('\n' + source.split('\n').map((line, i) => `${pad(i + 1, size)}: ${line}`).join('\n'));
        throw gl.getShaderInfoLog(shader);
    }
    return shader;
}

export default class Drawable {
    protected attributes: { [name: string]: { attribute: Attribute, attached: boolean } } = {};
    protected uniforms: { [name: string]: AbstractUniform } = {};
    protected _program: WebGLProgram;
    protected _drawType: Constants.DrawType;
    protected _startIndex: number = 0;
    protected _endIndex: number = 0;

    protected _position: Uniform = new Uniform(Uniform.FLOAT, 2);
    protected _scale: Uniform = new Uniform(Uniform.FLOAT, 2);
    protected _rotation: Uniform = new Uniform(Uniform.FLOAT, 1);


    public constructor(vertexShaderString: string, fragmentShaderString: string, drawType: Constants.DrawType) {
        this._program = gl.createProgram();
        this._drawType = drawType;
        const vertexShader = createShader(gl.VERTEX_SHADER, commonVertexShader + vertexShaderString);
        const fragmentShader = createShader(gl.FRAGMENT_SHADER, commonFragmentShader + fragmentShaderString);
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this._program);
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            throw gl.getProgramInfoLog(this.program);
        }
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);

        this._position.set(0, 0);
        this._scale.set(1.0, 1.0);
        this._rotation.set(0.0);

        this.uniforms['viewGeometry.translate'] = this._position;
        this.uniforms['viewGeometry.rotate'] = this._rotation;
        this.uniforms['viewGeometry.scale'] = this._scale;
    }

    public get program(): WebGLProgram {
        return this._program;
    }

    public get position(): Uniform {
        return this._position;
    }

    public get rotation(): Uniform {
        return this._rotation;
    }

    public get scale(): Uniform {
        return this._scale;
    }

    public get drawType(): Constants.DrawType {
        return this._drawType;
    }

    public get startIndex(): number {
        return this._startIndex;
    }

    public set startIndex(startIndex: number) {
        this._startIndex = startIndex;
    }

    public get endIndex(): number {
        return this._endIndex;
    }

    public set endIndex(endIndex: number) {
        this._endIndex = endIndex;
    }

    public updateAttribuets(): void {
        for (const name in this.attributes) {
            const { attribute, attached } = this.attributes[name];
            const loc = gl.getAttribLocation(this.program, name);
            if (attribute.needsUpdate) {
                attribute.update(loc);
            }
            if (!attached) {
                gl.enableVertexAttribArray(loc);
                this.attributes[name].attached = true;
            }
        }
    }

    public updateUniforms(): void {
        for (const name in this.uniforms) {
            const uniform = this.uniforms[name];
            const loc = gl.getUniformLocation(this.program, name);
            if (uniform.needsUpdate)  {
                uniform.update(loc);
            }
        }
    }

    public attachAttribute(name: string, attribute: Attribute): void {
        if (this.attributes[name] && this.attributes[name].attached) {
            gl.disableVertexAttribArray(gl.getAttribLocation(this.program, name));
        }
        this.attributes[name] = {
            attribute,
            attached: false,
        };
    }

    public detachAttribute(name: string): void {
        if (this.attributes[name]) {
            delete this.attributes[name];
            gl.disableVertexAttribArray(gl.getAttribLocation(this.program, name));
        }
    }

    public attachUniform(name: string, uniform: AbstractUniform): void {
        this.uniforms[name] = uniform;
    }

    public detachUniform(name: string): void {
        delete this.uniforms[name];
    }

    public update(viewport: AbstractUniform): void {
        this.uniforms['viewGeometry.viewport'] = viewport;
        this.updateAttribuets();
        this.updateUniforms();
    }
}
