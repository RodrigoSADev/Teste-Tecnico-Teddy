import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedClientsComponent } from './selected-clients.component';

describe('SelectedClientsComponent', () => {
  let component: SelectedClientsComponent;
  let fixture: ComponentFixture<SelectedClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedClientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
