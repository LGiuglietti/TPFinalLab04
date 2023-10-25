import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Models';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public user: User=new User();
  constructor(private apiService: ApiService, private router: Router){}

  ngOnInit(): void {
    
  }

  public userLogin()
  {
      this.apiService.getUser(this.user.email,this.user.password).subscribe({
        
        next: (result)=>{
          console.log(this.user.email);
          if(result.length>0)
            {
              this.router.navigate(["/main"]);
            }
        }, 
        error: (error) => console.log(error)
      })
      
  }


}
