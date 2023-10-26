import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../../auth/login/login.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{

  ngOnInit(): void {
    
  }
constructor(private router: Router){}

  public goToLogin(){
    this.router.navigate(["auth/login"]);
  }
  public goToRegister(){
    this.router.navigate(["auth/register"]);
  }
}
