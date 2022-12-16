import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { loggedIn } from '@angular/fire/auth-guard';
import {
  Firestore,
  collection,
  getDocs
} from '@angular/fire/firestore'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Requests } from 'src/app/requests.service';

@Component({
  selector: 'app-main',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  title = 'angular-firebase';
  public data: any = []
  result: any = {}
  movieDetails: any = {}
  myarrayWithOriginalTitles: any = []


  constructor(
    private userService: AuthService,
    private router: Router,
    public firestore: Firestore,
    private auth: Auth,
    private service: Requests
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
        console.log(usersData, "utsersData")
        this.result = usersData.filter((value) => {
          console.log(value['uid'] == userKey);
          return value['uid'] == userKey
        })
        console.log(this.result[0].favorites);
        for (let r of this.result[0].favorites) {

          this.service.getMovieDetails(r).subscribe(async (result) => {
            console.log(result, 'getmoviedetails#');
            await result;
            this.myarrayWithOriginalTitles.push(result.original_title)
            console.log(this.myarrayWithOriginalTitles, "Favorites in doc collection with full Original Titles");
          });
        }
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
