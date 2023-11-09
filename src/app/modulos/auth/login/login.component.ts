import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit{

  public user: User=new User();
  constructor(private authService: AuthService, private router: Router, private userService: UserService){}

  ngOnInit(): void {
    
  }

  public async userLogin()
  {
      try{
        const check= await this.authService.checkAuth(this.user.email,this.user.password);
        if(check.length>0)
        {
          console.log("home");
          this.user=check[0];
          this.userService.setSessionUser(this.user);
          this.router.navigate(["/main"]);
        }
        else{
          throw new Error;
          
        }
      }catch(error){
        alert("usuario inexistente");
      }
      
  }


}
