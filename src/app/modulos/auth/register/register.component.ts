import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  

  form: FormGroup = this.formBuilder.group({
    username: ["", [Validators.required, Validators.minLength(3)]],
    email: ["", [Validators.required, Validators.minLength(5), Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8)]],
    repeatpassword: ["", [Validators.required, Validators.minLength(8)]]
  })
  
  message = "";

  ngOnInit(): void { }

  constructor(private apiService: ApiService, private router: Router, private formBuilder: FormBuilder) { }

  public userRegister() {

    console.log(this.form.value);

    if (this.form.invalid) {
      alert("formulario invalido NO cumple con todo los validators")
      return;
    }

    if(this.form.valid){
      alert("formulario valido cumple con todo los validators")

      if(this.form.get("password")?.value == this.form.get("repeatpassword")?.value ){

        alert("Las contraseñas son iguales FELICIDADES")
        
        this.user.email = this.form.get("email")?.value
        this.user.userName = this.form.get("username")?.value
        this.user.password = this.form.get("password")?.value
      
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
      else{
        this.message = "Make sure you repeat the exact same password in both fields"
      }
    }
  }

  public goHome(){
    this.router.navigate(["/landing"]);
  }

  public goLogin(){
    this.router.navigate(["/auth/login"]);
  }
}
