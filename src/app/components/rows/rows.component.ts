import { Component, OnInit } from '@angular/core';
import { Requests } from 'src/app/requests.service';

@Component({
  selector: 'app-rows',
  templateUrl: './rows.component.html',
  styleUrls: ['./rows.component.css']
})
export class RowsComponent implements OnInit {

  trendingMovieResult: any = [];
  actionMovieResult: any = [];
  adventureMovieResult: any = [];
  animationMovieResult: any = [];
  comedyMovieResult: any = [];
  documentaryMovieResult: any = [];
  sciencefictionMovieResult: any = [];
  thrillerMovieResult: any = [];

  constructor(private service:Requests){}

  ngOnInit(): void {

    this.trendingData();
    this.actionMovie();
    this.adventureMovie();
    this.comedyMovie();
    this.animationMovie();
    this.documentaryMovie();
    this.sciencefictionMovie();
    this.thrillerMovie();

  }


  trendingData() {
    this.service.trendingMovieApiData().subscribe((result) => {
      console.log(result, 'trendingresult#');
      this.trendingMovieResult = result.results;
      // this.trendingMovieResult
    });
  }

  // action
  actionMovie() {
    this.service.fetchActionMovies().subscribe((result) => {
      this.actionMovieResult = result.results;
    });
  }




  // adventure
  adventureMovie() {
    this.service.fetchAdventureMovies().subscribe((result) => {
      this.adventureMovieResult = result.results;
    });
  }


  // animation
  animationMovie() {
    this.service.fetchAnimationMovies().subscribe((result) => {
      this.animationMovieResult = result.results;
    });
  }


  // comedy
  comedyMovie() {
    this.service.fetchComedyMovies().subscribe((result) => {
      this.comedyMovieResult = result.results;
    });
  }

  // documentary
  documentaryMovie() {
    this.service.fetchDocumentaryMovies().subscribe((result) => {
      this.documentaryMovieResult = result.results;
    });
  }


  // science-fiction
  sciencefictionMovie() {
    this.service.fetchScienceFictionMovies().subscribe((result) => {
      this.sciencefictionMovieResult = result.results;
    });
  }

  // thriller
  thrillerMovie() {
    this.service.fetchThrillerMovies().subscribe((result) => {
      this.thrillerMovieResult = result.results;
    });
  }

}
