import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Requests {

  constructor(private http: HttpClient) { }

  baseurl = "https://api.themoviedb.org/3";
  apikey = "8bf973bbbbaa57754a9a97eef5f4f077";


  //bannerapidata

  bannerApiData(): Observable<any> {
    return this.http.get(`${this.baseurl}/trending/all/week?api_key=${this.apikey}`);
  }


  // trendingmovieapidata
  trendingMovieApiData(): Observable<any> {
    return this.http.get(`${this.baseurl}/trending/movie/day?api_key=${this.apikey}`);
  }


  // action
  fetchActionMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=28`);
  }

  // adventure
  fetchAdventureMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=12`);
  }

  // animation
  fetchAnimationMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=16`);
  }

  // comedy
  fetchComedyMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=35`);
  }

  // documentary
  fetchDocumentaryMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=99`);
  }

  // science-fiction:878

  fetchScienceFictionMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=878`);
  }

  // thriller:53
  fetchThrillerMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=53`);
  }

}
