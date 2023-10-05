import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import {AppServiceService} from '../../app-service.service';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {


  teacherData: any;


  constructor(private service : AppServiceService, private router: Router) { }

  navigation = this.router.getCurrentNavigation();

  ngOnInit(): void {
    this.getTeacherData();
  }

  getTeacherData(){
    let teacher = {
      id : this.navigation.extras.state.id
    }
    this.service.getOneTeacherData(teacher).subscribe((response)=>{
      this.teacherData = response[0];
   
    },(error)=>{
      console.log('ERROR - ', error)
    })
  }

  // editTeacher(values){
  //   values.id = this.navigation.extras.state.id;
  //   this.service.editTeacher(values).subscribe((response)=>{
  //     this.teacherData = response[0];
  //     this.router.navigate([''])
  //   },(error)=>{
  //     console.log('ERROR - ', error)
  //   })
  // }

  editTeacher(values) {
    const updatedValues: any = { id: this.navigation.extras.state.id };
  
    // Conditionally update values if they are not empty
    if (values.name) {
      updatedValues.name = values.name;
    }
    if (values.age) {
      updatedValues.age = values.age;
    }
    
  
    // Check if any fields were updated before making the request
    if (Object.keys(updatedValues).length > 1) {
      this.service.editTeacher(updatedValues).subscribe(
        (response) => {
          this.teacherData = response[0];
          this.router.navigate(['']);
        },
        (error) => {
          console.log('ERROR - ', error);
        }
      );
    } else {
      console.log('No fields to update.');
      this.router.navigate(['']);
    }
  }

}