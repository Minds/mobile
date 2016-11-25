import {Component} from "@angular/core";

@Component({
  selector: "minds-native-app",
  templateUrl: "app.component.html",
  styleUrls: ['app.component.css']
})

export class MindsNativeApp {

  selectedIndex = 1;

  changedIndex(index){
    console.log(index);
  }
}
