precision highp float;
precision highp int;

#define PI 3.14159265359
#define PI2 6.28318530718
#define PI_HALF 1.5707963267949
#define RECIPROCAL_PI 0.31830988618
#define RECIPROCAL_PI2 0.15915494
#define LOG2 1.442695
#define EPSILON 1e-6

#define saturate(a) clamp( a, 0.0, 1.0 )
#define whiteCompliment(a) ( 1.0 - saturate( a ) )

float pow2( const in float x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }
// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract(sin(sn) * c);
}

struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
};

mat3 transpose( const in mat3 v ) {
	mat3 tmp;
	tmp[0] = vec3(v[0].x, v[1].x, v[2].x);
	tmp[1] = vec3(v[0].y, v[1].y, v[2].y);
	tmp[2] = vec3(v[0].z, v[1].z, v[2].z);

	return tmp;
}

struct ViewGeometry {
  vec2 viewport;
  vec2 translate;
  vec2 scale;
  float rotate;
};

uniform ViewGeometry viewGeometry;

vec4 projection(vec2 pos) {
  mat3 mProjection = mat3(
                  vec3(2.0 / viewGeometry.viewport.x, 0.0, -1.0),
                  vec3(0.0, -2.0 / viewGeometry.viewport.y, 1.0),
                  vec3(1.0)
                );
  mat3 mScale = mat3(
                  vec3(viewGeometry.scale.x, 0.0, 0.0),
                  vec3(0.0, viewGeometry.scale.y, 0.0),
                  vec3(0.0, 0.0, 1.0)
                );

  float s = sin(viewGeometry.rotate);
  float c = cos(viewGeometry.rotate);

  mat3 mRotate = mat3(
                  vec3(c , s, 0.0),
                  vec3(-s, c, 0.0),
                  vec3(0.0, 0.0, 1.0)
                );
  mat3 mTranslate = mat3(
                  vec3(1.0, 0.0, viewGeometry.translate.x),
                  vec3(0.0, 1.0,viewGeometry.translate.y),
                  vec3(0.0, 0.0, 1.0)
                );

  vec3 p = vec3(pos, 1.0);
  p = p * mScale * mRotate * mTranslate * mProjection;

  return vec4(p.xy, 0.0, 1.0); // normalize
}
