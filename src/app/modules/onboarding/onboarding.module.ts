import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { IonicModule } from 'ionic-angular';

import { OnboardingComponent } from './onboarding.component';
import { CategoriesComponent } from './categories.component';
import { AvatarSetupComponent } from './avatar-setup.component';

@NgModule({
  imports: [ IonicModule, HttpModule ],
  declarations: [ OnboardingComponent, CategoriesComponent, AvatarSetupComponent ],
  exports: [ OnboardingComponent ],
  entryComponents: [ OnboardingComponent ]
})
export class OnboardingModule { }
