import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, LoadingController, NavController } from 'ionic-angular';

import { Client } from '../../common/services/api/client';
import { Storage } from '../../common/services/storage';

import { CONFIG } from '../../config';

@Component({
  moduleId: 'module.id',
  selector: 'settings',
  templateUrl: 'settings.component.html',
  //styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SettingsComponent {

  minds = {
    cdn_url: CONFIG.cdnUrl
  };

  currentPassword: string;
  password: string;
  password2: string;
  currentEmail: string = "";
  mailChanged: boolean = false;
  myForm: FormGroup;
  categories: { id, label, selected }[] = [];
  selectedCategories: string[] = [];
  categoriesChanged: boolean;

  constructor(private client: Client, private cd: ChangeDetectorRef, private nav: NavController,
              private loadingCtrl: LoadingController, private storage: Storage, private alertCtrl: AlertController) {

  }

  ngOnInit() {

    this.myForm = new FormGroup({
      email: new FormControl(this.currentEmail)
    });

    this.getCategories()
      .then(() => {
        return this.client.get('api/v1/settings/' + this.storage.get('user_guid'))
      })
      .then((response: any) => {
        this.currentEmail = response.channel.email;
        this.selectedCategories = response.channel.categories;

        if (this.selectedCategories.length > 0) {
          this.selectedCategories.forEach((item, index, array) => {
            const category = this.categories.find(i => i.id === item);
            if (category)
              category.selected = true;
          });
        }

        this.detectChanges();
      });
  }

  save() {
    if (this.password != this.password2) {
      this.alertCtrl.create({
        title: 'Sorry!',
        subTitle: "The passwords your entered do not match",
        buttons: [ 'Try again' ]
      })
        .present();
      return;
    }

    let loader = this.loadingCtrl.create({
      //content: "Please wait...",
    });
    loader.present();

    this.client.post('api/v1/settings/' + this.storage.get('user_guid'), {
      password: this.currentPassword,
      new_password: this.password,
      email: this.currentEmail,
      categories: this.selectedCategories
    })
      .then((response) => {
        this.password = "";
        this.password2 = "";

        loader.dismiss();
        this.nav.pop();
      })
      .catch((error) => {
        loader.dismiss();
        this.alertCtrl.create({
          title: 'Sorry!',
          subTitle: error.message,
          buttons: [ 'Try again' ]
        })
          .present();
      });
  }

  getCategories() {
    return new Promise((resolve, reject) => {
      this.categories = [];

      this.client.get('api/v1/categories').then((categories: any) => {
        for (let id in categories.categories) {
          this.categories.push({
            id: id,
            label: categories.categories[ id ],
            selected: false
          });
        }
        this.categories.sort((a, b) => a.label > b.label ? 1 : -1);
        resolve(this.categories);
      }).catch(error => {
        console.error('got error: ', error);
        reject(error);
      });
    });
  }

  onCategoryClick(category) {
    category.selected = !category.selected;

    if (category.selected) {
      this.selectedCategories.push(category.id);
    } else {
      this.selectedCategories.splice(this.selectedCategories.indexOf(category.id), 1);
    }

    this.categoriesChanged = true;
  }

  detectChanges() {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

}
