import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorServiceService } from '../doctor-service.service';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {
  doctorDetails: any = { cNames: [] };

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorServiceService
  ) { }

  ngOnInit(): void {
    const searchTerm = this.route.snapshot.queryParamMap.get('searchTerm');
    if (searchTerm) {
      this.doctorService.getData().subscribe(
        (details: any[]) => {
          const matchingDoctors = details.filter((doctor) =>
            doctor.dName.toLowerCase().includes(searchTerm.toLowerCase())
          );

          if (matchingDoctors.length > 0) {
            this.doctorDetails = { ...matchingDoctors[0], cNames: [] };

            matchingDoctors.forEach((doctor) => {
              if (doctor.cName) {
                this.doctorDetails.cNames.push(doctor.cName);
              }
            });

            this.doctorDetails.cNames = [...new Set(this.doctorDetails.cNames)];

            console.log(this.doctorDetails);
          }
        },
        (error) => {
          console.error('Error fetching doctor details:', error);
        }
      );
    }
  }
}
