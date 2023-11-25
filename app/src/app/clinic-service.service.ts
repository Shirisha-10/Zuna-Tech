import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClinicServiceService {
  [x: string]: any;


  private link = 'http://localhost:3001/clinicData';

  constructor(private http: HttpClient) { }
  

  submitDetails(clinicData: any): Observable<any> {
    return this.http.post(this.link, clinicData);
  }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.link);
  }
  getClinicNames(): Observable<string[]> {
    return this.http.get<any[]>(this.link).pipe(
    
      map((clinicData: { cName: any; }[]) => clinicData.map((clinic: { cName: any; }) => clinic.cName))
    );
  }
  
  
  }
 