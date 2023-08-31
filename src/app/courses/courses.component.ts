import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


interface Course {
  id: number;
  courseName: string;
  location: string;
  createdAt: string;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courseForm: FormGroup | any;
  courses: Course[] = [];

  constructor(private _http: HttpClient, private _route: Router) {}

  ngOnInit(): void {
    
        this.courseForm = new FormGroup({
        courseName: new FormControl(),
        location: new FormControl()
        
      });
   
      this.loadCourses();
    
  }

  loadCourses() {
    this._http.get<Course[]>('http://localhost:3000/course')
      .subscribe(
        res => {
          this.courses = res;
        },
        err => {
          console.error('Error loading courses', err);
        }
      );
  }

  createCourse() {
    const courseData = this.courseForm.value;
  
    if (courseData.courseName && courseData.location) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Note: Les mois sont indexés à partir de 0
      const day = currentDate.getDate().toString().padStart(2, '0');
  
      const newCourse = {
        courseName: courseData.courseName,
        location: courseData.location,
        createdAt: `${year}-${month}-${day}`
      };
  
      this._http.post<any>('http://localhost:3000/course', newCourse)
        .subscribe(
          res => {
            alert('Course correctement créée');
            this.courseForm.reset();
            this.loadCourses(); 
          },
          err => {
            alert('Erreur lors de la création de la course');
          }
        );
    } else {
      alert('Merci de compléter tous les champs.');
    }
  }
  
  

  deleteCourse(courseId: number) {
    if (confirm('Voulez-vous supprimer cette course ?')) {
      this._http.delete(`http://localhost:3000/course/${courseId}`)
        .subscribe(
          res => {
            alert('Course supprimée');
            this.loadCourses(); 
          },
          err => {
            alert('Erreur lors de la suppression de la course');
          }
        );
    }
  }

  logout() {
    this._route.navigate(['login-list']);
  }
}