import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorServiceService } from '../doctor-service.service';
import { ClinicServiceService } from '../clinic-service.service';
import { doctor } from '../models/doctor';
import { clinic } from '../models/clinic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchResults: any[] = [];
  searchString: string = '';
  groupedDoctors: any[] = [];

  constructor(
    private doctorService: DoctorServiceService,
    private clinicService: ClinicServiceService, 
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSearch(): void {
    if (this.searchString.trim() !== '') {
      this.clinicService.getData().subscribe(
        (clinicResults: any[]) => {
          const clinicNames = clinicResults.map((clinic) => clinic.cName.toLowerCase());

          if (clinicNames.includes(this.searchString.toLowerCase())) {
            this.router.navigate(['/clinic-details'], { queryParams: { searchTerm: this.searchString } });
          } else {
            this.doctorService.getData().subscribe(
              (doctorResults: any[]) => {
                const groupedDoctors = this.groupDoctors(doctorResults);

                this.searchResults = groupedDoctors.filter((doctor: any) =>
                  doctor.dName.toLowerCase().includes(this.searchString.toLowerCase())
                );

                if (this.searchResults.length > 0) {
                  const firstResult = this.searchResults[0];

                  if (firstResult.dName) {
                    this.router.navigate(['/doctor-details'], { queryParams: { searchTerm: this.searchString } });
                  }
                }
              },
              (error) => {
                console.error('Error fetching doctors:', error);
              }
            );
          }
        },
        (error) => {
          console.error('Error fetching clinics:', error);
        }
      );
    } else {
      this.searchResults = [];
    }
  }


  private groupDoctors(doctors: any[]): any[] {
    const doctorsMap: Map<string, any> = new Map();
  
    for (const doctor of doctors) {
      const key = `${doctor.dName}-${doctor.age}-${doctor.phoneNumber}-${doctor.emailId}-${doctor.specialization}-${doctor.experience}`;
  
      if (!doctorsMap.has(key)) {
        doctorsMap.set(key, { ...doctor, cNames: [doctor.cName.toLowerCase()] });
      } else {
        const existingDoctor = doctorsMap.get(key);
        existingDoctor.cNames.push(doctor.cName.toLowerCase());
      }
    }
  
    this.groupedDoctors.push(...doctorsMap.values());
  
    return this.groupedDoctors;
  }
}
