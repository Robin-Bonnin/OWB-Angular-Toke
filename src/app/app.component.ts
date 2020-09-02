import { Component } from '@angular/core';
import * as fcl from "@onflow/fcl"
import { AuthenticationService } from './authentication.service'
fcl.config()
  .put("challenge.handshake", "http://localhost:8701/flow/authenticate")

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser;

  title = 'OWB-Toke';
  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

}
