import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router } from "@angular/router";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  private file: File
  public name: string;
  public description: string;
  
  constructor(private http: Http, private router: Router) {
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

      const headers = new Headers()

      const options = new RequestOptions({ headers: headers });
      const apiUrl = "http://localhost:3002/Upload";

      this.http.post(apiUrl, formData, options)
        .map(res => res.json())
        .catch(error => Observable.throw(error))
        .subscribe(
        data => this.router.navigate(['applications']),
        error => console.log(error)
        )

  }

  ngOnInit() {
  }

}

