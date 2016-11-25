import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import * as imageSource from "image-source";
import { RouterExtensions } from 'nativescript-angular/router';
import * as appSettings from "application-settings";


@Component({
  moduleId: module.id,
  selector: 'activity',
  templateUrl: 'activity.component.html',
  //styleUrls: ['activity.component.css']
})

export class Activity {

  @Input() entity;

  onLoaded(){
    console.log('fully loaded');
  }

}
