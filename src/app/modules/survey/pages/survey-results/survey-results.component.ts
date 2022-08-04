import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartDataset } from 'chart.js';
import { SurveyService } from '../../services/survey.service'
import { GenreService } from '../../services/genre.service'
import { Vote } from '../../Vote';
import { Genre } from '../../Genre';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.css'],
  providers: [SurveyService, GenreService],
})
export class SurveyResultsComponent implements OnInit{

  labels : string[] = [];
  votes : number[] = [];

  public barChartLegend = true;  

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.labels,
    datasets: [{data:this.votes}]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true

  };

  constructor(private surveyService: SurveyService, private genresService: GenreService ) {}

  ngOnInit() {
    this.setupChart();
  }

  setupChart() {
    forkJoin([this.surveyService.getEntries(), this.genresService.getGenres()]).subscribe(results => {
      const entries = results[0];
      const genres = results[1];

      let data = genres.map(genre => {
          let entry = entries.find(element => element.genre === genre.name)
          if(entry){
            return entry
          } else {
            return {genre: genre.name, count: 0}
          }
      })

      data.forEach(item => {
        this.labels.push(item.genre)
        this.votes.push(item.count)
      })

      this.barChartData = {
        labels: this.labels,
        datasets: [
          { data: this.votes, label: 'Votos Registrados' },
        ]
      }
    });
    
    
  }


}