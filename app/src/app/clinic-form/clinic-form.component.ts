import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClinicServiceService } from '../clinic-service.service';
import { DoctorServiceService } from '../doctor-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clinic-form',
  templateUrl: './clinic-form.component.html',
  styleUrls: ['./clinic-form.component.css']
})
export class ClinicFormComponent implements OnInit {
  clinicForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clinicService: ClinicServiceService,
    private doctorService: DoctorServiceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.clinicForm = this.fb.group({
      cName: ['', [Validators.required]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{10}$/), // Assuming 10-digit phone number
        ],
      ],
      emailId: [
        '',
        [
          Validators.required,
          Validators.email,
        ],
      ],
      address: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.clinicForm.valid) {
      const clinicData = this.clinicForm.value;
  
      this.clinicService.submitDetails(clinicData).subscribe(
        response => {
          console.log('Clinic details saved successfully:', response);
          this.openSnackBar('Clinic details saved successfully');
        },
        error => {
          console.error('Error saving clinic details:', error);
          this.openSnackBar('Error saving clinic details');
        }
      );
    } else {
      
      this.markFormGroupTouched(this.clinicForm);
    }
  }
  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
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