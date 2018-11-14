import { GLRenderer } from "./GLRenderer";


export class Triangle {

  // number of coordinates per vertex in this array
  private COORDS_PER_VERTEX = 3;

  private triangleCoords: number[] = [   // in counterclockwise order:
    0.5, 0.622008459, 1.0, // top
    -0.2, -0.311004243, 0.0, // bottom left
    0.5, -0.311004243, 0.0  // bottom right
  ];

  

  private vertexBuffer: java.nio.FloatBuffer;

  // Set color with red, green, blue and alpha (opacity) values
  private color: number[] = [0.63671875, 0.76953125, 0.22265625, 1.0];


  // set shader
  private vertexShaderCode: string =
    "attribute vec4 vPosition;" +
    "void main() {" +
    "  gl_Position = vPosition;" +
    "}";

  private fragmentShaderCode: string =
    "precision mediump float;" +
    "uniform vec4 vColor;" +
    "void main() {" +
    "  gl_FragColor = vColor;" +
    "}";

  private mProgram: number;
  private mPositionHandle: number;
  private mColorHandle: number;
  private vertexCount: number = this.triangleCoords.length / this.COORDS_PER_VERTEX;
  private vertexStride = this.COORDS_PER_VERTEX * 4; // 4 bytes per vertex


  constructor() {

    const bb = java.nio.ByteBuffer.allocateDirect(this.triangleCoords.length * 4);
    bb.order(java.nio.ByteOrder.nativeOrder());

    this.vertexBuffer = bb.asFloatBuffer();
    this.triangleCoords.forEach((v) => {
      this.vertexBuffer.put(v);
    });
    this.vertexBuffer.position(0);

    let vertexShader: number = GLRenderer.loadShader(android.opengl.GLES20.GL_VERTEX_SHADER, this.vertexShaderCode);
    let fragmentShader: number = GLRenderer.loadShader(android.opengl.GLES20.GL_FRAGMENT_SHADER, this.fragmentShaderCode);

    // create empty OpenGL ES Program
    this.mProgram = android.opengl.GLES20.glCreateProgram();

    // add the vertex shader to program
    android.opengl.GLES20.glAttachShader(this.mProgram, vertexShader);

    // add the fragment shader to program
    android.opengl.GLES20.glAttachShader(this.mProgram, fragmentShader);

    // creates OpenGL ES program executables
    android.opengl.GLES20.glLinkProgram(this.mProgram);
  }


  public draw(): void {
    // Add program to OpenGL ES environment
    android.opengl.GLES20.glUseProgram(this.mProgram);

    // get handle to vertex shader's vPosition member
    this.mPositionHandle = android.opengl.GLES20.glGetAttribLocation(this.mProgram, "vPosition");

    // Enable a handle to the triangle vertices
    android.opengl.GLES20.glEnableVertexAttribArray(this.mPositionHandle);

    // Prepare the triangle coordinate data
    android.opengl.GLES20.glVertexAttribPointer(
      this.mPositionHandle,
      this.COORDS_PER_VERTEX,
      android.opengl.GLES20.GL_FLOAT,
      false,
      this.vertexStride,
      this.vertexBuffer
    );

    // get handle to fragment shader's vColor member
    this.mColorHandle = android.opengl.GLES20.glGetUniformLocation(this.mProgram, "vColor");

    // Set color for drawing the triangle
    android.opengl.GLES20.glUniform4fv(this.mColorHandle, 1, this.color, 0);

    // Draw the triangle
    android.opengl.GLES20.glDrawArrays(android.opengl.GLES20.GL_TRIANGLES, 0, this.vertexCount);

    // Disable vertex array
    android.opengl.GLES20.glDisableVertexAttribArray(this.mPositionHandle);
  }
}