

export class ErrorLogger {

  static log = (text: string) => {

    const errorCode = android.opengl.GLES20.glGetError();

    if (errorCode !== android.opengl.GLES20.GL_NO_ERROR) {
      console.log(text, `Error: [${errorCode}]`);
    }
  }

}