import gl from 'core/gl';
import Attribute from 'core/Attribute';
import Drawable from 'core/Drawable';
import Stage from 'core/Stage';
import Uniform from 'core/Uniform';
import LineMesh from 'components/LineMesh';
import Vector2 from 'math/Vector2';

/*
class Triangle extends Drawable {
    constructor() {
        super(
            `
                attribute vec2 a_position;
                attribute vec3 a_color;
                varying vec3 v_color;

                void main() {
                    gl_Position = projection(a_position);
                    v_color = a_color;
                }
            `,
            `
                varying vec3 v_color;
                uniform vec3 u_color;
                void main() {
                    gl_FragColor = vec4(v_color, 1.0);
                    //gl_FragColor = vec4(u_color, 1.0);
                }
            `,
            gl.TRIANGLES
        );
        this._endIndex = 3;
    }
}

const colors = new Attribute(gl.ARRAY_BUFFER, new Float32Array(9), gl.FLOAT, 3);
colors.set(0, 1, 0, 0);
colors.set(1, 0, 1, 0);
colors.set(2, 0, 0, 1);


const vertices = new Attribute(gl.ARRAY_BUFFER, new Float32Array(6), gl.FLOAT, 2);
vertices.set(0, 0, 0);
vertices.set(1, 0, 100);
vertices.set(2, 100, 100);
const triangle = new Triangle();
triangle.attachAttribute('a_position', vertices);
triangle.attachAttribute('a_color', colors);

*/
const stage = new Stage();
//stage.add(triangle);
const line = new LineMesh([
    new Vector2(0, 0),
    new Vector2(100, 0),
    new Vector2(0, 100),
    new Vector2(100, 100),
], 10);
line.position.set(100, 100);
console.log(line['attributes']['a_vertex']['attribute']['_buffer'])
line.color = 0x00ff00;
stage.add(line);
let i = 10;
let e = 0.05;
let c = 255;
let ce = -1;
function render() {
    stage.clear();
    stage.render();
    line.width = i;
    i += e;
    if (i > 30) {
        e = -0.1;
    } else if (i < 10) {
        e = 0.1;
    }
    c  += ce;
    line.color = c * 256;
    if (c >= 255) {
        ce = -1;
    } else if (c <= 20) {
        ce = 1;
    }
    //requestAnimationFrame(render);
}
render();
