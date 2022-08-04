import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpErrorHandler } from 'src/app/http-error-handle.service';
import { GenreService } from './genre.service';

describe('GenreService', () => {
  let service: GenreService;

  beforeEach(() => {
    const httpErrorHandlerStub = () => ({ createHandleError: () => ({}) });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GenreService,
        { provide: HttpErrorHandler, useFactory: httpErrorHandlerStub }
      ]
    });
    service = TestBed.inject(GenreService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it(`rootURL has default value`, () => {
    expect(service.rootURL).toEqual(`http://localhost:8080/api/`);
  });

  describe('getGenres', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getGenres().subscribe(res => {
        expect(res).toEqual([]);
      });
      const req = httpTestingController.expectOne(`${service.rootURL}genres`);
      expect(req.request.method).toEqual('GET');
      req.flush([]);
      httpTestingController.verify();
    });
  });
});
