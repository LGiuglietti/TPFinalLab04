import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Models';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public user: User=new User();
  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    
  }

  public async userLogin()
  {
      try{
        const check=this.authService.checkAuth(this.user.email,this.user.password);
        if(await check)
        {
          this.router.navigate(["/home"]);
        }
      }catch(error){
        alert("usuario inexistente");
      }
      
  }


}
