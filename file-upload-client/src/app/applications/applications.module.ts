import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { ApplicationsRoutingModule } from './applications-routing.module';
import { UploadComponent } from './upload/upload.component';
import { AllApplicationsComponent } from './all-applications/all-applications.component';

@NgModule({
  declarations: [UploadComponent, AllApplicationsComponent],
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    FormsModule
  ]

})
export class ApplicationsModule { }
