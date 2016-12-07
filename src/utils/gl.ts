const canvas: HTMLCanvasElement = document.createElement('canvas');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
document.body.appendChild(canvas);

const webgl: WebGLRenderingContext = canvas.getContext('webgl');
webgl.viewport(0, 0, canvas.width, canvas.height);
webgl.clearColor(0, 0, 0, 0);
webgl.clear(webgl.COLOR_BUFFER_BIT);

export default webgl;
