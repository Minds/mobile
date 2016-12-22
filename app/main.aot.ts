import { platformNativeScript } from "nativescript-angular/platform-static";
import { MindsNativeModuleNgFactory } from  "./app.module.ngfactory";

platformNativeScript().bootstrapModuleFactory(MindsNativeModuleNgFactory);
