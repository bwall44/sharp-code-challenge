import { Component, OnInit } from '@angular/core';
import { DoctorService } from './doctor.service';
import { Doctor } from './doctor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sharp Code Challenge';
  familyPracticeDoctors: Doctor[] = [];
  pediatricDoctors: Doctor[] = [];

  constructor(private doctorService: DoctorService) { }

  ngOnInit() {
    this.getDoctors();
  }
      
  getDoctors(): void {
    this.doctorService.getDoctors()
      .subscribe(doctors => {
        // the member variables below will hold collections of doctors that are bound to the app.component.html template
        this.familyPracticeDoctors = this.processDoctorArray(doctors, 'FamilyPractice');
        this.pediatricDoctors = this.processDoctorArray(doctors, 'Pediatrics');
      });
  }

  processDoctorArray(doctors, practiceType): Doctor[] {
    //console.log(doctors);

    //filter doctors based on specialty
    doctors = doctors.filter(doctor => doctor.specialty == practiceType);
    //sort doctors based on reviews
    doctors = doctors.sort(function(a, b){return b.reviewCount-a.reviewCount});
    
    return doctors;
  }
}
