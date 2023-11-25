import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClinicServiceService } from '../clinic-service.service';
import { DoctorServiceService } from '../doctor-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.css']
})
export class DoctorFormComponent implements OnInit {
  doctorForm!: FormGroup;
  clinicNames: string[] = [];

  constructor(
    private fb: FormBuilder,
    private clinicService: ClinicServiceService,
    private doctorService: DoctorServiceService,
    private snackBar: MatSnackBar  
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadClinicNames();
  }

  private initForm(): void {
    this.doctorForm = this.fb.group({
      dName: ['', [Validators.required, Validators.maxLength(50)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      emailId: ['', [Validators.required, Validators.email]],
      specialization: ['', [Validators.required]],
      experience: ['', [Validators.required, Validators.min(0)]],
      cName: ['', [Validators.required]],
    });
  }

  private loadClinicNames(): void {
    this.clinicService.getClinicNames().subscribe(
      names => {
        this.clinicNames = names;
      },
      error => {
        console.error('Error fetching clinic names:', error);
      }
    );
  }

  onSubmit(): void {
    console.log("submit");
    if (this.doctorForm.valid) {
      console.log("doctor");
      const doctorData = this.doctorForm.value;

      this.doctorService.submitDetails(doctorData).subscribe(
        
        response => {
          console.log('Doctor details saved successfully:', response);
          this.openSnackBar('Clinic details saved successfully');
        },
        error => {
          console.error('Error saving doctor details:', error);
          this.openSnackBar('Error saving clinic details');
        }
      );
    } else {
      this.markFormGroupTouched(this.doctorForm);
    }
  }
  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,  // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    (Object as any).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}