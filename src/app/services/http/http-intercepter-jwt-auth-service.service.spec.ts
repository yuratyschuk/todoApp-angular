import { TestBed } from '@angular/core/testing';

import { HttpIntercepterJwtAuthServiceService } from './http-intercepter-jwt-auth-service.service';

describe('HttpIntercepterJwtAuthServiceService', () => {
  let service: HttpIntercepterJwtAuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpIntercepterJwtAuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
