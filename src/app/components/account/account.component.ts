import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  getDocs,
  doc
} from '@angular/fire/firestore'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  title = 'angular-firebase';
  public data: any = []
  result: any = {}

  constructor(
    private userService: AuthService,
    private router: Router,
    public firestore: Firestore,
    private auth: Auth,
  ) { this.getData() }

  getData() {
    const dbInstance = collection(this.firestore, 'users');
    const userKey = this.auth.currentUser?.uid;
    console.log(userKey);
    getDocs(dbInstance)
      .then((response) => {
        const usersData = [...response.docs.map((item) => {
          return { ...item.data() }
        })]
        // console.log(usersData)
        this.result = usersData.filter((value) => {
          console.log(value['uid'] == userKey);
          return value['uid'] == userKey
        })
        console.log(this.result);
      })
  }

  onClick() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/register']);
      })
      .catch(error => console.log(error));
  }

}
