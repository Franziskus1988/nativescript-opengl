
/**
 * Copyright (C) TomTec Imaging Systems GmbH, 2018. All rights reserved.
 *
 * The source code is protected by copyright laws and international copyright treaties, as well as
 * other intellectual property laws and treaties. 
 **/

// tslint:disable-next-line:no-any
declare var de: any;

import { GLRenderer } from "./GLRenderer";

export class GLSurfaceView extends android.opengl.GLSurfaceView {

  private readonly mRenderer: GLRenderer;

  constructor(context: android.content.Context) {
    super(context);

    this.setEGLContextClientVersion(2);

    //User renderer from native android
    this.mRenderer = new de.tomtec.GLRenderer();
    this.setRenderer(this.mRenderer);
  }
}