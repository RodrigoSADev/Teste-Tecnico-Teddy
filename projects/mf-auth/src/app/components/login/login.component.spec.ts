import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all main elements', () => {
    expect(
      fixture.debugElement.query(By.css('[data-test="login-container"]'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('[data-test="login-card"]'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('[data-test="login-title"]'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('[data-test="login-form"]'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('[data-test="username-input"]'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('[data-test="submit-button"]'))
    ).toBeTruthy();
  });

  it('should display the correct title', () => {
    const titleElement = fixture.debugElement.query(
      By.css('[data-test="login-title"]')
    );
    expect(titleElement.nativeElement.textContent).toContain(
      'Olá, seja bem-vindo!'
    );
  });

  it('should disable the button when the form is invalid', () => {
    const submitButton = fixture.debugElement.query(
      By.css('[data-test="submit-button"]')
    );
    expect(submitButton.nativeElement.disabled).toBeTruthy();
  });

  it('should enable the button when the form is valid', () => {
    const usernameInput = fixture.debugElement.query(
      By.css('[data-test="username-input"]')
    );
    usernameInput.nativeElement.value = 'João';
    usernameInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(
      By.css('[data-test="submit-button"]')
    );
    expect(submitButton.nativeElement.disabled).toBeFalsy();
  });

  it('should display error message when the field is invalid and was touched', () => {
    const usernameInput = fixture.debugElement.query(
      By.css('[data-test="username-input"]')
    );

    usernameInput.nativeElement.value = 'a';
    usernameInput.nativeElement.dispatchEvent(new Event('input'));

    usernameInput.nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(
      By.css('[data-test="error-message"]')
    );
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.nativeElement.textContent).toContain(
      'Por favor, preencha o campo de nome com pelo menos 2 caracteres.'
    );
  });

  it('should not display error message when the field is valid', () => {
    const usernameInput = fixture.debugElement.query(
      By.css('[data-test="username-input"]')
    );

    usernameInput.nativeElement.value = 'João';
    usernameInput.nativeElement.dispatchEvent(new Event('input'));

    usernameInput.nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(
      By.css('[data-test="error-message"]')
    );
    expect(errorMessage).toBeFalsy();
  });

  it('should have the correct placeholder in the input field', () => {
    const usernameInput = fixture.debugElement.query(
      By.css('[data-test="username-input"]')
    );
    expect(usernameInput.nativeElement.placeholder).toBe('Digite seu nome:');
  });

  it('should initialize the form with validations', () => {
    expect(component.loginForm).toBeTruthy();
    expect(component.loginForm.get('username')).toBeTruthy();
    expect(component.loginForm.get('username')?.valid).toBeFalsy();
  });

  it('should validate the username field with at least 2 characters', () => {
    const usernameControl = component.loginForm.get('username');

    usernameControl?.setValue('');
    expect(usernameControl?.valid).toBeFalsy();

    usernameControl?.setValue('a');
    expect(usernameControl?.valid).toBeFalsy();

    usernameControl?.setValue('ab');
    expect(usernameControl?.valid).toBeTruthy();
  });

  it('should save the username in sessionStorage and navigate to /clientes when the form is valid', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const setItemSpy = spyOn(sessionStorage, 'setItem');

    component.loginForm.get('username')?.setValue('João');
    component.onLogin();

    expect(setItemSpy).toHaveBeenCalledWith('userName', 'João');
    expect(navigateSpy).toHaveBeenCalledWith(['/clientes']);
  });

  it('should not navigate or save in sessionStorage when the form is invalid', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const setItemSpy = spyOn(sessionStorage, 'setItem');

    component.loginForm.get('username')?.setValue('a');
    component.onLogin();

    expect(setItemSpy).not.toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
