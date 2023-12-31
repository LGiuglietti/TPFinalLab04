import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Movie, User } from 'src/app/core/Models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input() movieList: Movie[] = [];
  @Output() queryString = new EventEmitter<string>()
  //output
  searchForm: FormGroup;
  currentRoute: string;
  showDiv: number = 0;

  constructor(private router: Router, private formBuilder: FormBuilder, private toastr: ToastrService, private userService: UserService) {
    this.searchForm = this.formBuilder.group({
      searchQuery: ''
    });
    this.currentRoute = this.router.url;
    console.log(this.currentRoute);
  }

  ngOnInit(): void {
    const check = this.router.url;
    this.checkRoute();
  }

  public logout() {
    //alert("sesion cerrada");
    this.toastr.success("Session closed successfully!", "GOODBYE!")
    this.userService.setSessionUser(new User());
    this.router.navigate(["/auth/login"]);
  }

  public goToFavourite() {
    this.router.navigate(["/favourite"]);
  }

  public goToHome() {
    this.router.navigate(["/main"]);
  }

  checkRoute(){
    if(this.router.url=='/favourite'){
      this.showDiv=1;
    }
    else if(this.router.url=='/comments'){
      this.showDiv=2;
    }
    else{
      this.showDiv=0;
    }
  }

  onSubmit() {
    const searchControl = this.searchForm.get('searchQuery');
    if (searchControl) {
      const searchQuery: string = searchControl.value;
      //output evento llevar query
      this.queryString.emit(searchQuery);
    }
  }
}
