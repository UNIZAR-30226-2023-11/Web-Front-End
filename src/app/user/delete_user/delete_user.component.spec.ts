import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarUsernameComponent } from './delete_user.component';

describe('PantallaComponent', () => {
  let component: CambiarUsernameComponent;
  let fixture: ComponentFixture<CambiarUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarUsernameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambiarUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
