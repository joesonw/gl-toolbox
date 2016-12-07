import gl from 'core/gl';

namespace Constants {
    export enum AttributeTarget {
        ARRAY_BUFFER = gl.ARRAY_BUFFER,
        ELEMENT_ARRAY_BUFFER = gl.ELEMENT_ARRAY_BUFFER,
    }
    export enum AttributeUsage {
        STATIC_DRAW = gl.STATIC_DRAW,
        DYNAMIC_DRAW = gl.DYNAMIC_DRAW,
        STREAM_DRAW = gl.STREAM_DRAW,
    }
    export enum AttributeType {
        BYTE = gl.BYTE,
        UNSIGNED_BYTE = gl.UNSIGNED_BYTE,
        SHORT = gl.SHORT,
        UNSIGNED_SHORT = gl.UNSIGNED_SHORT,
        FLOAT = gl.FLOAT,
    }
    export enum DrawType {
        POINTS = gl.POINTS,
        LINES = gl.LINES,
        LINE_STRIP = gl.LINE_STRIP,
        LINE_LOOP = gl.LINE_LOOP,
        TRIANGLES = gl.TRIANGLES,
        TRIANGLE_STRIP = gl.TRIANGLE_STRIP,
        TRIANGLE_FAN = gl.TRIANGLE_FAN,
    }
    export enum UniformType {
        INT,
        FLOAT,
    }
}

export default Constants;
