import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map'

@Injectable()
export class ApplicationApiService {

  constructor(private http: Http) { }

  getAllApplications() {
    return this.http.get('http://localhost:3002/applications')
      .map(res => res.json());
  }

  deleteApplication(id: number) {
    return this.http.delete(`http://localhost:3002/applications/${id}`);
  }

  getFileUrl(fileName: string) {

    return this.http.get(`http://localhost:3002/file/images/${fileName}`)
      .map(res => res.json());
  }

  submitApplications(formData){
 
      const apiUrl = "http://localhost:3002/Upload";

    return this.http.post(apiUrl, formData)
        .map(res => res.json());
  }
}
