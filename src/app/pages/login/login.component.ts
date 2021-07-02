import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = {
    username:'',
    password:'',
  }

  constructor(private login:LoginService, private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit() { 
    if(this.loginData.username.trim()=='' || this.loginData.username==null) {
      alert("username is required");
      return;
    }

    if(this.loginData.password.trim()=='' || this.loginData.password==null) {
      alert("password is required");
      return;
    }

    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("success");
        console.log(data);

        //login..
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);
            //redirect ..ADMIN admin-dashboard
            //redirect ..NORMAL normal-dashboard
            if(this.login.getUserRole()=='ADMIN') {
            this.router.navigate(['admin']);
            this.login.loginStatusSubject.next(true);
            }
            else if(this.login.getUserRole()=='NORMAL') { 
              this.router.navigate(['user-dashboard']);
              this.login.loginStatusSubject.next(true);
            }
            else { 
              this.login.logout();

            }
          }
        )
      },
      (error) => { 
        console.log(error);
        alert("invalid details");
      }
    )
  }

}
