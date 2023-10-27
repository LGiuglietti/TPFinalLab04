import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Models';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: User = new User();
  ngOnInit(): void {
  }
  constructor(private apiService: ApiService, private router: Router) { }

  public userRegister() {
    this.apiService.setUser(this.user).subscribe({
      next: () => {
        alert("usuario creado");
        this.router.navigate(["./auth/login"]);
      },
      error: (error) => {
        console.error(error)
        if (this.user.email == '' || this.user.password == '' || this.user.userName == '') {
          alert("todavia hay campos en blanco");
        } else {
          alert("mail ya en uso");
        }
      }
    })
  }
}
