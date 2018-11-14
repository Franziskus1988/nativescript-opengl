import { Component, OnInit } from "@angular/core";
import { CreateViewEventData } from "tns-core-modules/ui/placeholder";
import { GLSurfaceView } from "./GLSurfaceView";


@Component({
  selector: "tt-opengl",
  moduleId: module.id,
  templateUrl: "./opengl.component.html"
})
export class OpenGLComponent implements OnInit {

  // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class.
  // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
  constructor() { }


  ngOnInit(): void {
  }


  creatingView(args: CreateViewEventData) {
    const view = new GLSurfaceView(args.context);
    args.view = view;
  }
}

