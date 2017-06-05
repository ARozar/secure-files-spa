import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { UploadComponent } from './upload/upload.component';
import { AllApplicationsComponent } from './all-applications/all-applications.component';
import { ApplicationApiService } from './services/application-api.service';


@NgModule({
  declarations: [UploadComponent, AllApplicationsComponent],
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    FormsModule
  ],
  providers:[ApplicationApiService]

})
export class ApplicationsModule { }
