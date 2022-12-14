import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Requests } from 'src/app/requests.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchResults:any
  // FormGroup est construit avec un "object" associant chaque propriété à un FormControl qui permet d'accéder  aux valeurs et aux "controls" via la propriété associée.
// https://guide-angular.wishtack.io/angular/formulaires/reactive-forms/la-boite-a-outils-des-reactive-forms#formgroup
searchForm = new FormGroup({
  'movieName':new FormControl(null)
});

  constructor(private service:Requests){

  }


  submitForm()
  {
      console.log(this.searchForm.value,'searchform#');
      this.service.getSearchMovie(this.searchForm.value).subscribe((result)=>{
          console.log(result,'searchmovie##');
          this.searchResults = result.results;
      });
  }

}


