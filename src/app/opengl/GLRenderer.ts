
import { Triangle } from "./Triangle";


@Interfaces([android.opengl.GLSurfaceView.Renderer])
export class GLRenderer extends java.lang.Object implements android.opengl.GLSurfaceView.Renderer {

  private mTriangle: Triangle;

  constructor() {
    super();
    return global.__native(this);
  }


  onSurfaceCreated(_unsued: javax.microedition.khronos.opengles.GL10, _config: javax.microedition.khronos.egl.EGLConfig) {
    android.opengl.GLES20.glClearColor(1.0, 0.0, 0.0, 1.0);
    this.mTriangle = new Triangle();
  }


  onSurfaceChanged(_unused: javax.microedition.khronos.opengles.GL10, width: number, height: number) {
    android.opengl.GLES20.glViewport(0, 0, width, height);
  }


  onDrawFrame(_unused: javax.microedition.khronos.opengles.GL10) {
    // tslint:disable-next-line:no-bitwise
    android.opengl.GLES20.glClear(android.opengl.GLES20.GL_COLOR_BUFFER_BIT);
    this.mTriangle.draw();
  }


  static loadShader(type: number, shaderCode: string): number {

    // create a vertex shader type (android.opengl.GLES20.GL_VERTEX_SHADER)
    // or a fragment shader type (android.opengl.GLES20.GL_FRAGMENT_SHADER)
    const shader: number = android.opengl.GLES20.glCreateShader(type);

    // add the source code to the shader and compile it
    android.opengl.GLES20.glShaderSource(shader, shaderCode);
    android.opengl.GLES20.glCompileShader(shader);

    return shader;
  }
}