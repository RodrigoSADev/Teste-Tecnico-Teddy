import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Client } from '../../models/client.interface';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  const mockClient: Client = {
    id: 1,
    name: 'Cliente Teste',
    salary: 5000,
    companyValuation: 100000,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show modal when isOpen is false', () => {
    component.isOpen.set(false);
    fixture.detectChanges();

    const modal = fixture.debugElement.query(
      By.css('[data-test="modal-backdrop"]')
    );
    expect(modal).toBeNull();
  });

  it('should show modal when isOpen is true', () => {
    component.isOpen.set(true);
    fixture.detectChanges();

    const modal = fixture.debugElement.query(
      By.css('[data-test="modal-backdrop"]')
    );
    expect(modal).toBeTruthy();
  });
});
