import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Client } from '../../models/client.interface';
import { ModalType } from '../../models/modal.type';
import { CurrencyInputPipe } from '../../pipes/currency-input-pipe';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, ReactiveFormsModule, CurrencyInputPipe],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  formBuilder = inject(FormBuilder);

  type = input<ModalType>('create');
  client = input<Client | null>(null);
  save = output<Client>();
  delete = output<Client>();
  cancel = output<void>();

  salaryFormatted = '';
  companyValuationFormatted = '';

  isOpen = signal<boolean>(false);

  clientForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    salary: [0, [Validators.required, Validators.min(0.01)]],
    companyValuation: [0, [Validators.required, Validators.min(0.01)]],
  });

  constructor() {
    effect(() => {
      const clientData = this.client();
      const modalType = this.type();

      if (modalType === 'edit' && clientData) {
        this.clientForm.patchValue({
          name: clientData.name,
          salary: clientData.salary,
          companyValuation: clientData.companyValuation,
        });
      } else if (modalType === 'create') {
        this.clientForm.reset();
      }
    });
  }

  open(): void {
    this.isOpen.set(true);
    this.initializeForm();
  }

  close(): void {
    this.isOpen.set(false);
    this.clientForm.reset();
    this.cancel.emit();
  }

  onSalaryInput(event: any): void {
    const rawValue = event.target.value.replace(/\D/g, '');
    const numericValue = Number(rawValue) / 100;
    this.clientForm.get('salary')?.setValue(numericValue, { emitEvent: false });
  }

  onCompanyValuationInput(event: any): void {
    const rawValue = event.target.value.replace(/\D/g, '');
    const numericValue = Number(rawValue) / 100;
    this.clientForm
      .get('companyValuation')
      ?.setValue(numericValue, { emitEvent: false });
  }

  private initializeForm(): void {
    if (this.type() === 'edit' && this.client()) {
      const clientData = this.client()!;
      this.clientForm.patchValue({
        name: clientData.name,
        salary: clientData.salary,
        companyValuation: clientData.companyValuation,
      });
      this.salaryFormatted = (clientData.salary ?? 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
      this.companyValuationFormatted = (
        clientData.companyValuation ?? 0
      ).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    } else {
      this.clientForm.reset();
      this.salaryFormatted = '';
      this.companyValuationFormatted = '';
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  onSubmit(): void {
    if (this.type() === 'delete' && this.client()) {
      this.delete.emit(this.client()!);
    } else if (this.clientForm.valid) {
      const formValue = this.clientForm.value;
      const clientData: Client = {
        id: this.client()?.id ?? 0,
        name: formValue.name ?? '',
        salary: Number(formValue.salary),
        companyValuation: Number(formValue.companyValuation),
      };

      if (this.type() === 'edit' && this.client()?.id) {
        clientData.id = this.client()!.id;
      }

      this.save.emit(clientData);
    } else {
      this.clientForm.markAllAsTouched();
    }

    if (this.type() === 'delete' || this.clientForm.valid) {
      this.close();
    }
  }

  getModalTitle(): string {
    switch (this.type()) {
      case 'create':
        return 'Criar cliente:';
      case 'edit':
        return 'Editar cliente:';
      case 'delete':
        return 'Excluir cliente:';
      default:
        return '';
    }
  }

  getSubmitButtonText(): string {
    switch (this.type()) {
      case 'create':
        return 'Criar cliente';
      case 'edit':
        return 'Editar cliente';
      case 'delete':
        return 'Excluir cliente';
      default:
        return 'Confirmar';
    }
  }
}
