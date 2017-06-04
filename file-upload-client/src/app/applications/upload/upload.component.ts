import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router } from "@angular/router";

import { ApplicationApiService } from '../services/application-api.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  private file: File
  public name: string;
  public description: string;
  
  constructor(private applicationApi: ApplicationApiService, private router: Router) {
  }

  fileChange(event) {

    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      this.file = fileList[0];
      
    }
  }

  submit(){
    const formData: FormData = new FormData();
      formData.append('document', this.file, this.file.name);

      formData.append('name', this.name);

      formData.append('description', this.description);

      this.applicationApi.submitApplications(formData)
        .subscribe(
        data => this.router.navigate(['applications']),
        error => console.log(error)
        )

  }

  ngOnInit() {
  }

}

