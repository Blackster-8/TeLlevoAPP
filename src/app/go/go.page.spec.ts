import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoPage } from './go.page';

describe('GoPage', () => {
  let component: GoPage;
  let fixture: ComponentFixture<GoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
