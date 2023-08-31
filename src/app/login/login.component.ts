import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: FormGroup | any;

  constructor(
    private _http: HttpClient,
    private _route: Router,
  ) {}

  ngOnInit(): void {
    this.login = new FormGroup({
      'username': new FormControl(),
      'password': new FormControl()
    });
  }

  logindata(login: FormGroup) {
    this._http.get<any>('http://localhost:3000/register').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return (
            a.username === this.login.value.username &&
            a.password === this.login.value.password
          );
        });

        if (user) {
         
          alert('Connexion réussie');
          this._route.navigate(['courses']);
        } else {
          alert('Utilisateur ou mot de passe incorrect');
          this._route.navigate(['login']);
        }
      },
      (err) => {
        alert('Aïe il y a de la casse');
      }
    );
  }
}