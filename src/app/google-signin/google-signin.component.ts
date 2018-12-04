import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-google-signin',
  templateUrl: './google-signin.component.html',
  styleUrls: ['./google-signin.component.css']
})
export class GoogleSigninComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  isSignedIn(): boolean {
    return this.authService.isSignedIn;
  }

  click() {
    if (this.isSignedIn()) {
      this.authService.signOut();
    } else {
      this.authService.signIn();
    }
  }
}
