import {Component, NgZone, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {concat} from 'rxjs';

@Component({
    selector: 'app-google-signin',
    templateUrl: './google-signin.component.html',
    styleUrls: ['./google-signin.component.css']
})
export class GoogleSigninComponent implements OnInit {

    isSignedIn: boolean;
    isLoaded: boolean;
    data: string[][];

    constructor(private authService: AuthService, private zone: NgZone) {
    }

    ngOnInit() {
        // let first = timer(10,500).pipe(
        //   map(r => { return {source: 1, value: r} }),
        //   take(4)
        // )
        // let second = timer(10,500).pipe(
        //   map(r => { return {source: 2, value: r} }),
        //   take(4)
        // )
        // first.pipe(
        //   concat(second)
        // ).subscribe(res => console.log(res));
        concat(this.authService.isLoaded$, this.authService.isSignedIn$)
            .subscribe((status: boolean) => {
                this.isSignedIn = status;
                if (this.isSignedIn) {
                    this.loadSpreadSheet();
                } else {
                    this.unloadSpreadSheet();
                }
            });
    }

    unloadSpreadSheet(): any {
        this.data = undefined;
        this.isLoaded = true;
    }

    loadSpreadSheet(): any {
        const s = this.authService.spreadsheets.values.get({
            spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
            range: 'Class Data!A1:E10'
        }).then(response => {
            this.zone.run(() => {
                const range = response.result;
                this.data = range.values.map(data => [data[0], data[2], data[4]]);
                this.isLoaded = true;
            });
        });
    }

    click() {
        if (this.isSignedIn) {
            this.authService.signOut();
        } else {
            this.authService.signIn();
        }
    }
}
