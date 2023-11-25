import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DoctorFormComponent } from './doctor-form/doctor-form.component';
import { ClinicFormComponent } from './clinic-form/clinic-form.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { ClinicDetailsComponent } from './clinic-details/clinic-details.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'doctor-form', component:DoctorFormComponent  },
  { path: 'clinic-form', component: ClinicFormComponent },
  { path:'doctor-details',component:DoctorDetailsComponent},
  { path:'clinic-details',component:ClinicDetailsComponent}

  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule {}