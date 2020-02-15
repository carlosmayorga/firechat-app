import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser: any = {};

  constructor(private firestoreService: FirestoreService,
              private angularFireAuth: AngularFireAuth) {

    this.angularFireAuth.authState.subscribe(response => {
      if (!response) {
        return;
      }
      console.log(response);
      this.loginUser.name = response.displayName;
      this.loginUser.uid = response.uid;
    });
  }

  ngOnInit(): void {
  }

  login(socialLogin) {
    this.firestoreService.login(socialLogin);
  }

  logout() {
    this.loginUser.name = '';
    this.loginUser.uid = '';
    this.firestoreService.logout();
  }

}
