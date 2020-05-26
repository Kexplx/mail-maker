/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MailGenerationFormComponent } from './mail-generation-form.component';

describe('MailGenerationFormComponent', () => {
  let component: MailGenerationFormComponent;
  let fixture: ComponentFixture<MailGenerationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailGenerationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailGenerationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
