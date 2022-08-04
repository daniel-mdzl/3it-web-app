import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Vote } from '../Vote';
import { SurveyService } from './survey.service';
import { HttpErrorHandler } from '../../../http-error-handle.service';
import { MessageService } from '../../../message.service';
import { Genre } from '../Genre';
import { Entry } from '../Entry';

describe('SurveyService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let surveyService: SurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [ HttpClientTestingModule ],
      // Provide the service-under-test and its dependencies
      providers: [
        SurveyService,
        HttpErrorHandler,
        MessageService
      ]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    surveyService = TestBed.inject(SurveyService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /// surveyService method tests begin ///
    describe('#getEntries', () => {
    let expectedEntries: Entry[];

    beforeEach(() => {
      surveyService = TestBed.inject(SurveyService);
      expectedEntries = [
        { genre: 'ROCK', count: 1 },
        { genre: 'LO-FI', count: 0 },
       ] as Entry[];
    });

    it('should return expected entries (called once)', () => {

      surveyService.getEntries().subscribe({
        next: entries => expect(entries),
        error: fail,
      });

      // surveyService should have made one request to GET votes from expected URL
      const req = httpTestingController.expectOne(`${surveyService.rootURL}entries`);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock votes
      req.flush(expectedEntries);
    });


    it('should return expected entries (called multiple times)', () => {

      surveyService.getEntries().subscribe();
      surveyService.getEntries().subscribe();
      surveyService.getEntries().subscribe({
        next: entries => expect(entries).toEqual(expectedEntries),
        error: fail,
      });

      const requests = httpTestingController.match(`${surveyService.rootURL}entries`);
      expect(requests.length).toEqual(3, 'calls to getEntries()');

      // Respond to each request with different mock hero results
      requests[0].flush([]);
      requests[1].flush([{id: 1, name: 'bob'}]);
      requests[2].flush(expectedEntries);
    });
  });
  //   describe('#updateHero', () => {
//     // Expecting the query form of URL so should not 404 when id not found
//     const makeUrl = (id: number) => `${surveyService.rootURL}/?id=${id}`;

//     it('should update a hero and return it', () => {

//       const updateHero: Vote = { id: 1, name: 'A' };

//       surveyService.updateHero(updateHero).subscribe({
//         next: data => expect(data).toEqual(updateHero, 'should return the hero'),
//         error: fail,
//       });

//       // surveyService should have made one request to PUT hero
//       const req = httpTestingController.expectOne(surveyService.heroesUrl);
//       expect(req.request.method).toEqual('PUT');
//       expect(req.request.body).toEqual(updateHero);

//       // Expect server to return the hero after PUT
//       const expectedResponse = new HttpResponse(
//         { status: 200, statusText: 'OK', body: updateHero });
//       req.event(expectedResponse);
//     });

//     // This service reports the error but finds a way to let the app keep going.
//     it('should turn 404 error into return of the update hero', () => {
//       const updateHero: Vote = { id: 1, name: 'A' };

//       surveyService.updateHero(updateHero).subscribe({
//         next: data => expect(data).toEqual(updateHero, 'should return the update hero'),
//         error: fail,
//       });

//       const req = httpTestingController.expectOne(surveyService.heroesUrl);

//       // respond with a 404 and the error message in the body
//       const msg = 'deliberate 404 error';
//       req.flush(msg, {status: 404, statusText: 'Not Found'});
//     });
//   });

  // TODO: test other surveyService methods
});
