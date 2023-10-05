import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import {AppServiceService} from '../../app-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  studentData: any;


  constructor(
    private service : AppServiceService, 
    private router: Router,
  
    ) { }

  navigation = this.router.getCurrentNavigation();

  ngOnInit(): void {
    this.getStudentData();

  }


  getStudentData(){
    let student = {
      id : this.navigation.extras.state.id
    }
    this.service.getOneStudentData(student).subscribe((response)=>{
      this.studentData = response[0];
    },(error)=>{
      console.log('ERROR - ', error)
    })
  }

  // editStudent(values){
  //   values.id = this.navigation.extras.state.id;
  //   this.service.editStudent(values).subscribe((response)=>{
  //     this.studentData = response[0];
  //     this.router.navigate(['student'])
  //   },(error)=>{
  //     console.log('ERROR - ', error)
  //   })
  // }
  
  editStudent(values) {
    const updatedValues: any = { id: this.navigation.extras.state.id };
  
    // Conditionally update values if they are not empty
    if (values.name) {
      updatedValues.name = values.name;
    }
    if (values.age) {
      updatedValues.age = values.age;
    }
    if (values.hometown) {
      updatedValues.hometown = values.hometown;
    }
  
    // Check if any fields were updated before making the request
    if (Object.keys(updatedValues).length > 1) {
      this.service.editStudent(updatedValues).subscribe(
        (response) => {
          this.studentData = response[0];
          this.router.navigate(['student']);
        },
        (error) => {
          console.log('ERROR - ', error);
        }
      );
    } else {
      console.log('No fields to update.');
      this.router.navigate(['student']);
    }
  }
  
  

}


