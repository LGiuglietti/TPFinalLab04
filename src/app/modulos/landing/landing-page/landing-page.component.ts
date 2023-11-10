import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../../auth/login/login.component';
import { MoviesService } from 'src/app/core/services/movies.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{

  constructor( private router: Router){}

  ngOnInit(): void {
    
  }

  public goToLogin(){
    
    this.router.navigate(["auth/login"]);
  }
  public goToRegister(){
    this.router.navigate(["auth/register"]);
  }
}
