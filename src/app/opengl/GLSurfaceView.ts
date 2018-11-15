
import { GLRenderer } from "./GLRenderer";

// tslint:disable-next-line:no-any
declare var com: any;

export class GLSurfaceView extends android.opengl.GLSurfaceView {

  private readonly mRenderer: GLRenderer;

  constructor(context: android.content.Context) {
    super(context);

    this.setEGLContextClientVersion(2);

    /**
     * This doesn't work!
     */
    this.mRenderer = new GLRenderer();

    /**
     * When I use a native Java implementation like the one in native/GLRenderer.java
     * instead it works
     * 
     * this.mRenderer = new com.tns.GLRenderer();
     */
    
    this.setRenderer(this.mRenderer);
  }
}