import { Injectable, NgZone } from '@angular/core';
declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Client ID and API key from the Developer Console
  private static readonly CLIENT_ID = '910031515658-l7u85tdqrqg6l8l0flflo129jvga4ip2.apps.googleusercontent.com';
  private static readonly API_KEY = 'AIzaSyC3niJh2MXefZPE_DODeHzPu8CMeHx1au8';

  // Array of API discovery doc URLs for APIs used by the quickstart
  private static readonly DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  private static readonly SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
  authInst: gapi.auth2.GoogleAuth;
  isSignedIn: any;

  constructor(private zone: NgZone) {
    this.load();
  }

  load() {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: AuthService.API_KEY,
        clientId: AuthService.CLIENT_ID,
        discoveryDocs: AuthService.DISCOVERY_DOCS,
        scope: AuthService.SCOPES
      }).then(() => {
        this.zone.run(() => {
          this.authInst = gapi.auth2.getAuthInstance();
          // // Listen for sign-in state changes.
          this.authInst.isSignedIn.listen((status) => {
            this.updateSigninStatus(status);
          });
          // // Handle the initial sign-in state.
          this.updateSigninStatus(this.authInst.isSignedIn.get());
        })
      })
    })
  }

  updateSigninStatus(status: boolean): any {
    this.zone.run(() => {
      this.isSignedIn = status;
    })
  }

  signIn() {
    // this.zone.run(() => {
      this.authInst.signIn();
    // })
  }

  signOut() {
    // this.zone.run(() => {
      this.authInst.signOut();
    // })
  }
}
