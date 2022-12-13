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
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  dataUser: any = {}
  userUID: any = ""
  data: any
  like:boolean = false
  saved:boolean = false

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



    const dbInstance = collection(this.firestore, 'users');
    // first we need to get the doc from users collection that includes a uid equal to the user uid
    getDocs(dbInstance)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          return ({ ...item.data(), id: item.id })
        })]
        this.dataUser = this.data.filter((iterator: any) => {
          const userKey = this.auth.currentUser?.uid;
          return iterator.uid == userKey
        })
        this.dataUser[0].favorites.includes(this.getParamId) ? this.like=true: this.like=false
      })







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

  setFavoriteToUserDoc() {
    const dbInstance = collection(this.firestore, 'users');
    // first we need to get the doc from users collection that includes a uid equal to the user uid
    getDocs(dbInstance)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          console.log({ ...item.data(), id: item.id })
          return ({ ...item.data(), id: item.id })
        })]
        // console.log(this.data);
        this.dataUser = this.data.filter((iterator: any) => {
          const userKey = this.auth.currentUser?.uid;
          return iterator.uid == userKey
        })
        console.log(this.dataUser[0].id);
        const currentUserRef = doc(this.firestore, "users", this.dataUser[0].id)
        if (this.dataUser[0].favorites.includes(this.getParamId)==false) {
          updateDoc(currentUserRef, {
            favorites: [...this.dataUser[0].favorites, this.getParamId]
          });
          this.like=true;
          this.saved=true;
          } else {
            updateDoc(currentUserRef, {
            favorites: [...this.dataUser[0].favorites].filter(item=>item!==this.getParamId)
          });
          this.like=false;
          this.saved=false;

            alert('The film has been removed from your favorites');
          }

      })
  }

}





