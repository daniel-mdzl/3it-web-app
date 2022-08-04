import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web-app';
  
  menu = [
    {path: '', title: 'Inicio', icon: 'home'},
    {path: 'survey-form', title: 'Encuesta', icon: 'note_add'},
    {path: 'survey-results', title: 'Resultados', icon: 'poll'},
    {path: 'about', title: 'Acerca de', icon: 'perm_device_information'}
  ]

  changeBackground(bg: string) {
    console.log(bg)
  }

}
