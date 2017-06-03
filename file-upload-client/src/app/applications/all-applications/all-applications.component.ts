import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";


@Component({
  selector: 'app-all-applications',
  templateUrl: './all-applications.component.html',
  styleUrls: ['./all-applications.component.css']
})
export class AllApplicationsComponent implements OnInit {

  public applications: any[];

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get('http://localhost:3002/applications')
      .map(res => res.json())
      .subscribe(
      (data) => this.applications = data
      );
  }

  deleteApplication(id: number) {

    this.http.delete(`http://localhost:3002/applications/${id}`, )
      .subscribe(
      () => this.applications = this.applications.filter((application) => application._id !== id)
      );
  }

  getFileUrl(fileName: string) {

    this.http.get(`http://localhost:3002/file/images/${fileName}`)
      .map(res => res.json())
      .subscribe(
       ({uri}) => window.open(uri, '_blank')
      );
  }

}
