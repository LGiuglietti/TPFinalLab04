import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/Models';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{
  constructor(private userService: UserService){}

  ngOnInit(): void {
    const user=this.userService.getSessionUser();  
    console.log(user);
  }
  


}
