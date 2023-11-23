import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private apiService: ApiService, private router: Router, 
              private formBuilder: FormBuilder, private toastr: ToastrService) { }

  public userRegister() {

    console.log(this.form.value);

    if (this.form.invalid) {
      this.toastr.error("Please complete with your information", "Come on!")
      //alert("formulario invalido NO cumple con todo los validators")
      return;
    }

    if(this.form.valid){
      //alert("formulario valido cumple con todo los validators")
      //this.toastr.info("verifying your information.", "A second please ...")

      if(this.form.get("password")?.value == this.form.get("repeatpassword")?.value ){

        //alert("Las contraseñas son iguales FELICIDADES")
        //this.toastr.success("Processing your information ...", "GOOD !")
        
        this.user.email = this.form.get("email")?.value
        this.user.userName = this.form.get("username")?.value
        this.user.password = this.form.get("password")?.value
      
        this.apiService.setUser(this.user).subscribe({
          next: () => {
            //alert("usuario creado");
            //this.toastr.success("Run to LogIn !", "Welcome!")
            this.router.navigate(["./auth/login"]);
            this.toastr.success("LogIn now!", "All are ready!")
          },
          error: (error) => {
            console.error(error)
            if (this.user.email == '' || this.user.password == '' || this.user.userName == '') {
              //alert("todavia hay campos en blanco");
              this.toastr.warning("Complete with your information.", "OH no again!")
            } else {
              this.toastr.warning("This email has already been registered.", "Stop there!")
              //alert("mail ya en uso");
            }
          }
        })
      }
      else{
        this.toastr.warning("please, verify your information again.", "Attention")
        this.message = "Passwords are not the same. Try again."
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
