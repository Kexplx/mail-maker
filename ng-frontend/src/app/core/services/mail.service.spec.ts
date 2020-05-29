import { MailService } from './mail.service';
import { TestBed } from '@angular/core/testing';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

fdescribe('Service: Mail', () => {
  let service: MailService;

  let httpClientSpy: any;
  let getStubValue: Observable<any>;
  let postStubValue: Observable<any>;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);

    getStubValue = of({ captchaUrl: 'test', id: '123' });
    postStubValue = of({
      createdTimestamp: 123,
      password: 'password',
      username: 'username',
    });

    httpClientSpy.get.and.returnValue(getStubValue);
    httpClientSpy.post.and.returnValue(postStubValue);

    TestBed.configureTestingModule({
      providers: [MailService, { provide: HttpClient, useValue: httpClientSpy }],
    });

    service = TestBed.inject(MailService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should call http.get() once during crawl()', () => {
    service.crawl();

    expect(httpClientSpy.get.calls.count()).toBe(1, 'get was called once');
  });

  it('should call http.post() once during crawl()', () => {
    service.answer({ captcha: 'ads', sessionId: 'asd' });

    expect(httpClientSpy.post.calls.count()).toBe(1, 'post was called once');
  });
});
