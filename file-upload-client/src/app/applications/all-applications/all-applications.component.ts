import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { ApplicationApiService } from '../services/application-api.service';

@Component({
  selector: 'app-all-applications',
  templateUrl: './all-applications.component.html',
  styleUrls: ['./all-applications.component.css']
})
export class AllApplicationsComponent implements OnInit {

  public applications: any[];

  constructor(private applicationApi: ApplicationApiService) { }

  ngOnInit() {
    this.applicationApi.getAllApplications()
      .subscribe(
      (data) => this.applications = data
      );
  }

  deleteApplication(id: number) {

    this.applicationApi.deleteApplication(id)
      .subscribe(
      () => this.applications = this.applications.filter((application) => application._id !== id)
      );
  }

  getFileUrl(fileName: string) {

    this.applicationApi.getFileUrl(fileName)
      .map(res => res.json())
      .subscribe(
       ({uri}) => window.open(uri, '_blank')
      );
  }

}
