import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';

import { EmptyStateComponent } from './empty-state.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('EmptyStateComponent', () => {
  let component: EmptyStateComponent;
  let fixture: ComponentFixture<EmptyStateComponent>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyStateComponent ],
      imports: [
        BrowserDynamicTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyStateComponent);
    location = TestBed.inject(Location);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call back', () => {
    spyOn(location, 'back').and.callThrough();

    component.back();

    expect(location.back).toHaveBeenCalled();
  });
});
