import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilrComponent } from './profilr.component';

describe('ProfilrComponent', () => {
  let component: ProfilrComponent;
  let fixture: ComponentFixture<ProfilrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
