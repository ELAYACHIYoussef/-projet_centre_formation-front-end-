import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/model/user.model";
import { UserAuthService } from "src/app/shared/services/user-auth.service";
import { UserService } from "src/app/shared/services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;
  showPassword: boolean = true;

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ){
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  public login() {
    console.log('Function called');
    console.log(this.loginForm.value);
    console.log('Function fhhfhf');

    // Utilisez le modèle User ici
    const user: User = {
      username: this.loginForm.value.username ?? '',
      password: this.loginForm.value.password ?? '',
    };

    this.userService.login(user).subscribe(
      (response: any) => {
        console.log("respo");
        console.log("roll " + response.role);
        this.userAuthService.setRoles(response.role);
        this.userAuthService.setToken(response.message);
        this.userAuthService.setUserId(response.userId)
        const role = response.role;
        console.log(response);
        if (role === 'ROLE_ADMIN') {
          this.router.navigate(['/testTraine']);
        } else if (role === 'ROLE_ASSISTANT') {
          this.router.navigate(['/testTraine']);
        } else if (role === 'ROLE_FORMAT') {
          this.router.navigate(['/format']);
        }
      },
      (err) => {
        console.log("hshgshs");
        console.log(err);
      }
    );
  }
}
