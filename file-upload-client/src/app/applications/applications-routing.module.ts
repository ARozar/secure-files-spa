import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadComponent } from './upload/upload.component';
import { AllApplicationsComponent } from "./all-applications/all-applications.component";

const routes: Routes = [
    { path: 'upload', component: UploadComponent },
    { path: 'applications', component: AllApplicationsComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule { }