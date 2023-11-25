import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {
  getDoctorDetails(doctorId: any) {
    throw new Error('Method not implemented.');
  }
  searchDoctors(searchTerm: any) {
    throw new Error('Method not implemented.');
  }
  private doctorLink = 'http://localhost:3000/doctorData';

  constructor(private http: HttpClient) {}

  submitDetails(doctorData: any): Observable<any> {
    return this.http.post(this.doctorLink, doctorData);
  }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.doctorLink);
  }

  
}