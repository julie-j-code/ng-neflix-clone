import { Component, OnInit } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Requests } from 'src/app/requests.service';
import {
  Firestore,
  collection,
  getDocs,
  doc,
  updateDoc
} from '@angular/fire/firestore'

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  dataUser: any = {}
  userUID: any = ""
  data: any

  constructor(private service: Requests, private router: ActivatedRoute, private auth: Auth, private firestore: Firestore) {
  }

  getParamId: any;
  getMovieDetailResult: any;
  getMovieVideoResult: any;
  getMovieCastResult: any;

  ngOnInit(): void {
    this.getParamId = this.router.snapshot.paramMap.get('id');
    console.log(this.getParamId, 'getparamid#');
    this.getMovie(this.getParamId);
    this.getVideo(this.getParamId);
    this.getMovieCast(this.getParamId);
  }


  getMovie(id: any) {
    this.service.getMovieDetails(id).subscribe(async (result) => {
      console.log(result, 'getmoviedetails#');
      this.getMovieDetailResult = await result;
    });
  }

  getVideo(id: any) {
    this.service.getMovieVideo(id).subscribe((result) => {
      console.log(result, 'getMovieVideo#');
      result.results.forEach((element: any) => {
        if (element.type == "Trailer") {
          this.getMovieVideoResult = element.key;
        }
      });

    });
  }

  getMovieCast(id: any) {
    this.service.getMovieCast(id).subscribe((result) => {
      console.log(result, 'movieCast#');
      this.getMovieCastResult = result.cast;
    });
  }

  addFavoriteToUserDoc() {
    const dbInstance = collection(this.firestore, 'users');
    // first we need to get the doc from users collection that includes a uid equal to the user uid
    getDocs(dbInstance)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          console.log({ ...item.data(), id: item.id })
          return ({ ...item.data(), id: item.id })
        })]

        // return the doc corresponding to the current user in the users collection + the automatic generated id included in the object
        console.log(this.data);
        this.dataUser = this.data.filter((iterator: any) => {
          const userKey = this.auth.currentUser?.uid;
          return iterator.uid == userKey
        })
        console.log(this.dataUser[0].id);
        const currentUserRef = doc(this.firestore, "users", this.dataUser[0].id)
        // let newFavorites=[...this.dataUser[0].favorites, this.getParamId]
        // Set the "favorites" field of the user with userKey to the movie passed in params
        updateDoc(currentUserRef, {
          favorites: [...this.dataUser[0].favorites, this.getParamId]
        });

      })
  }

}





