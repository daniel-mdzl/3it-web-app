import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyFormComponent } from './modules/survey/pages/survey-form/survey-form.component';
import { SurveyResultsComponent } from './modules/survey/pages/survey-results/survey-results.component';
import { LandingComponent } from './modules/survey/pages/landing/landing.component';
import { AboutComponent } from './modules/survey/pages/about/about.component';

const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'survey-form', component: SurveyFormComponent},
  { path: 'survey-results', component: SurveyResultsComponent},
  { path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
