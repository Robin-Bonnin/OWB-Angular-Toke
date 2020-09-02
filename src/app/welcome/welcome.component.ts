import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service'
import * as fcl from "@onflow/fcl"
import {setupAdminAccount} from 'contracts/1setup-admin-account.js'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  users: any[] = []

  constructor(
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentUser.subscribe(user => this.authenticatedUser = user);
  }

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem("users"));
    fcl.currentUser().subscribe(this.handleUser);
  }

  authenticatedUser: any = {}

  handleUser = (user) => {
    if (user.cid) {
      this.authenticationService.login(user);
      const found = this.users.find(member => member.address === user.addr)
      if (found == null) {
        this.users.push({ id: user.cid, address: user.addr, name: user.identity.name })
        localStorage.setItem('users', JSON.stringify(this.users))
      } else {
      }
    } else {
      this.authenticatedUser = null;
    }
    console.log("user : " + this.authenticatedUser)
  };

  resetData() {
    this.authenticatedUser = null;
  }

  async setupAdminAccount() {
    console.log('setting up admin')
    await setupAdminAccount()
  }

  authenticate() {
    fcl.authenticate();
  }

  unauthenticate() {
    this.authenticationService.logout()
    fcl.unauthenticate();
  }

  async callGlobalSale() {
  }
}
