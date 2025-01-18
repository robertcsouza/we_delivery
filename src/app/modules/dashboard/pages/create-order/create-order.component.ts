import { Component } from '@angular/core';
import { NavBarComponent } from "../../../../shared/nav-bar/nav-bar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BreadCrumbsComponent } from "../../../../shared/bread-crumbs/bread-crumbs.component";
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';

@Component({
  selector: 'app-create-order',
  standalone:true,
  imports: [NavBarComponent, ReactiveFormsModule, CommonModule, BreadCrumbsComponent],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss'
})
export class CreateOrderComponent {
  registrationForm: FormGroup = new FormGroup({});
  isSubmitting = false;
  state_default: boolean = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      product_name: ['', [Validators.required]],
      cpf: ['', [Validators.required, this.validateCPF]],
      phone: ['', [Validators.required]],
      size: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      to_delivery: [false, [Validators.required]],
      cep: ['', [Validators.required]],
      street: ['', [Validators.required]],
      neighborhood: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['Brasil', [Validators.required]],
      observation: ['']
    });
  }

  validateCPF(control: any) {
    const cpf = control.value.replace(/[^\d]+/g, '');
    if (cpf.length !== 11) return { invalidCpf: true };
    // Add more CPF validation logic if needed
    return null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registrationForm.get(fieldName);
    return field!.invalid && (field!.dirty || field!.touched);
  }

  async onCepBlur() {
    const cep = this.registrationForm.get('cep')?.value.replace(/[^\d]+/g, '');
    if (cep?.length === 8) {
      try {
        // Implement CEP lookup service
        // const address = await this.cepService.lookup(cep);
        // this.registrationForm.patchValue({
        //   street: address.street,
        //   neighborhood: address.neighborhood,
        //   city: address.city,
        //   state: address.state
        // });
      } catch (error) {
        console.error('CEP lookup failed', error);
      }
    }
  }

  async onSubmit() {
    if (this.registrationForm.valid) {
      this.isSubmitting = true;
      try {
        // Implement form submission
        console.log(this.registrationForm.value);
        // await this.registrationService.submit(this.registrationForm.value);
        alert('Cadastro realizado com sucesso!');
      } catch (error) {
        console.error('Registration failed', error);
        alert('Erro ao realizar cadastro. Tente novamente.');
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}
