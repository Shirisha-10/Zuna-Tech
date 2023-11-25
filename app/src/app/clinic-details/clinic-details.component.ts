import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClinicServiceService } from '../clinic-service.service';
import { DoctorServiceService } from '../doctor-service.service';

@Component({
  selector: 'app-clinic-details',
  templateUrl: './clinic-details.component.html',
  styleUrls: ['./clinic-details.component.css']
})
export class ClinicDetailsComponent implements OnInit {
  clinicDetails: any = { doctors: [] }; 

  constructor(
    private route: ActivatedRoute,
    private clinicService: ClinicServiceService,
    private doctorService: DoctorServiceService
  ) {}

  ngOnInit(): void {
    const searchTerm = this.route.snapshot.queryParamMap.get('searchTerm');
    if (searchTerm) {
      this.clinicService.getData().subscribe(
        (clinics: any[]) => {
          const matchingClinic = clinics.find((clinic) =>
            clinic.cName.toLowerCase() === searchTerm.toLowerCase()
          );

          if (matchingClinic) {
            console.log('Matching Clinic:', matchingClinic);
          
            this.clinicDetails = { ...matchingClinic, doctors: [] };
            console.log('Clinic Details:', this.clinicDetails);
          
            this.doctorService.getData().subscribe(
              (doctors: any[]) => {
                console.log('All Doctors:', doctors);
            
                const associatedDoctors = doctors
                  .filter((doctor) =>
                    doctor.cName && doctor.cName.toLowerCase() === matchingClinic.cName.toLowerCase()
                  )
                  .map((doctor) => ({ dName: doctor.dName }));
            
                console.log('Associated Doctors:', associatedDoctors);
            
                this.clinicDetails.doctors = associatedDoctors;
                console.log('Final Clinic Details:', this.clinicDetails);
              },
              (error) => {
                console.error('Error fetching associated doctors:', error);
              }
            );
            
          }
          
        },
        (error) => {
          console.error('Error fetching clinic details:', error);
        }
      );
    }
  }
}
