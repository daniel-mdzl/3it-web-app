import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Entry } from '../../Entry';
import { Genre } from '../../Genre';
import { GenreService } from '../../services/genre.service';
import { SurveyService } from '../../services/survey.service';
import Swal from 'sweetalert2';

import { Vote } from '../../Vote';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css'],
  providers: [GenreService, SurveyService],
})
export class SurveyFormComponent implements OnInit{

  constructor(private genresService: GenreService, private surveyService: SurveyService ) {}

  genre: Genre = new Genre();
  email: string = '';

  genres: Genre[] = []

  successAlert(){
    
  }

  setupSelect(){
    this.genresService.getGenres().subscribe({
      next: (result) => {
        // Handle result
        this.genres = result
        this.genre = result[0]
      },
      error: (e) => {
        console.log('error', e)
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error inesperado!',
          text: e
        })
      },
      complete: () => console.info('complete') 
    })
  }
  
  ngOnInit() {
    this.setupSelect();
  }

  onSubmit(){
    const request = new Vote();
    request.email = this.email;
    request.genre = this.genre

    this.surveyService.addVote(request).subscribe({
      next: (result) => {
        // Handle result
        console.log('what', result)
        Swal.fire({
          icon: 'success',
          title: 'Voto Ingresado',
          text: 'Has votado con éxito!'
        })
      },
      error: (e) => {
        console.log('error', e)
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error inesperado!',
          text: e
        })
      },
      complete: () => console.info('complete') 
    })
    
    // const request = new Entry();
    // request.email = this.email;
    // request.genreCode = this.genreCode

    // console.log(request);

    // this.surveyService.create(request).subscribe(i => {
    //   console.log(i);
    //   this.router.navigate(['/']);
    // },
    // err => {
    //   this.errorEvent.emit(err.error.description);
    //   this.router.navigate(['/error'], {state:{data:err.error.description}});
    // }
    // );

  }

}