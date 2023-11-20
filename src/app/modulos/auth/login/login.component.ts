import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Models';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User = new User();

  form: FormGroup = this.formBuilder.group({
    email: ["", [Validators.required, Validators.minLength(5), Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8)]]
  })

  constructor(private authService: AuthService, private router: Router, private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void { }

  public async userLogin() {
    console.log(this.form.value);

    if (this.form.invalid) {
      alert("formulario invalido NO cumple con todo los validators")
      return;
    }

    if (this.form.valid) {
      this.user.email = this.form.get("email")?.value
      this.user.password = this.form.get("password")?.value

      //this.user.email = this.form.controls["email"].value
      //this.user.password = this.form.controls["password"].value

      console.log(this.user);

      try {
        const check = await this.authService.checkAuth(this.user.email, this.user.password);
        if (check.length > 0) {
          console.log("home");
          this.user = check[0];
          this.userService.setSessionUser(this.user);
          this.router.navigate(["/main"]);
        }
        else {
          throw new Error;
        }
      } catch (error) {
        console.log(error);
      }
    }

  }

  public goHome() {
    this.router.navigate(["/landing"]);
  }

  public goRegister() {
    this.router.navigate(["/auth/register"]);
  }
}
