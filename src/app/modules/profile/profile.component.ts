import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavBarComponent } from "../../shared/nav-bar/nav-bar.component";
import { BreadCrumbsComponent } from "../../shared/bread-crumbs/bread-crumbs.component";

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavBarComponent, BreadCrumbsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  personalForm: FormGroup = new FormGroup({});
  addressForm: FormGroup = new FormGroup({});
  isPersonalEditing = false;
  isAddressEditing = false;
  isSaving = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Initialize with mock data
    this.personalForm = this.fb.group({
      name: ['João da Silva', [Validators.required]]
    });

    this.addressForm = this.fb.group({
      cep: ['12345-678', [Validators.required]],
      street: ['Rua das Flores, 123', [Validators.required]],
      neighborhood: ['Centro', [Validators.required]],
      city: ['São Paulo', [Validators.required]],
      state: ['SP', [Validators.required]]
    });
  }

  togglePersonalEdit() {
    this.isPersonalEditing = !this.isPersonalEditing;
  }

  toggleAddressEdit() {
    this.isAddressEditing = !this.isAddressEditing;
  }

  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return field!.invalid && (field!.dirty || field!.touched);
  }

  async onCepBlur() {
    const cep = this.addressForm.get('cep')?.value.replace(/[^\d]+/g, '');
    if (cep?.length === 8) {
      try {
        // Implement CEP lookup service
        // const address = await this.cepService.lookup(cep);
        // this.addressForm.patchValue({...});
      } catch (error) {
        console.error('CEP lookup failed', error);
      }
    }
  }

  async savePersonal() {
    if (this.personalForm.valid) {
      this.isSaving = true;
      try {
        // Implement save logic
        await new Promise(resolve => setTimeout(resolve, 1000)); // Mock API call
        this.isPersonalEditing = false;
        alert('Informações pessoais atualizadas com sucesso!');
      } catch (error) {
        alert('Erro ao salvar alterações. Tente novamente.');
      } finally {
        this.isSaving = false;
      }
    }
  }

  async saveAddress() {
    if (this.addressForm.valid) {
      this.isSaving = true;
      try {
        // Implement save logic
        await new Promise(resolve => setTimeout(resolve, 1000)); // Mock API call
        this.isAddressEditing = false;
        alert('Endereço atualizado com sucesso!');
      } catch (error) {
        alert('Erro ao salvar alterações. Tente novamente.');
      } finally {
        this.isSaving = false;
      }
    }
}
}

