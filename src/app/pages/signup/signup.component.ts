import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService) { }
  
  public user = {
    email:'',
    password:'',
    firstName:'',
    lastName:'',
    phone:'',
  }

  ngOnInit(): void {
  }

  formSubmit() { 
    if(this.user.email=='' || this.user.email==null) {
      alert("user is required");
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data)=>{
        //success
        alert("success");
      },
      (error)=>{ 
        alert("something went wrong");
      }
    )
  }

}
