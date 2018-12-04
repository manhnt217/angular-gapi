import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { FooComponent } from './foo/foo.component';
import { GoogleSigninComponent } from './google-signin/google-signin.component';

@NgModule({
  declarations: [
    AppComponent,
    FooComponent,
    GoogleSigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
