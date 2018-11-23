import { ErrorLogger } from "~/app/opengl/ErrorLogger";


@Interfaces([android.opengl.GLSurfaceView.EGLContextFactory])
export class EGLContextFactory extends java.lang.Object implements android.opengl.GLSurfaceView.EGLContextFactory {

  private static EGL_CONTEXT_CLIENT_VERSION = 0x3098;

  constructor() { 
    super();
    return global.__native(this);
  }


  public destroyContext(egl: javax.microedition.khronos.egl.EGL10, distplay: javax.microedition.khronos.egl.EGLDisplay, context: javax.microedition.khronos.egl.EGLContext): void { 
    if (!egl.eglDestroyContext(distplay, context)) { 
      throw new Error("Destroy context failed");
    }
  }


  public createContext(egl: javax.microedition.khronos.egl.EGL10, display: javax.microedition.khronos.egl.EGLDisplay, eglConfig: javax.microedition.khronos.egl.EGLConfig): javax.microedition.khronos.egl.EGLContext { 

    const attributes = [EGLContextFactory.EGL_CONTEXT_CLIENT_VERSION, 2, javax.microedition.khronos.egl.EGL10.EGL_NONE];
    
    const context = egl.eglCreateContext(display, eglConfig, javax.microedition.khronos.egl.EGL10.EGL_NO_CONTEXT, attributes);

    egl.eglMakeCurrent(display, egl.eglGetCurrentSurface(javax.microedition.khronos.egl.EGL10.EGL_DRAW), egl.eglGetCurrentSurface(javax.microedition.khronos.egl.EGL10.EGL_READ), context);

    egl.eglSwapBuffers(display, egl.eglGetCurrentSurface(javax.microedition.khronos.egl.EGL10.EGL_READ));

    return context;
  }
}