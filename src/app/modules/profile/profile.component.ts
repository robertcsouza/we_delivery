import { state } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, effect, runInInjectionContext, Injector } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavBarComponent } from "../../shared/nav-bar/nav-bar.component";
import { BreadCrumbsComponent } from "../../shared/bread-crumbs/bread-crumbs.component";
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavBarComponent, BreadCrumbsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  readonly profileService:ProfileService = inject(ProfileService)
  personalForm: FormGroup = new FormGroup({});
  addressForm: FormGroup = new FormGroup({});
  isPersonalEditing = false;
  isAddressEditing = false;
  isSaving = false;

  constructor() {}
  fromBuild:FormBuilder = inject(FormBuilder)
  injector = inject(Injector);
  ngOnInit() {
    this.profileService.getUser()
    runInInjectionContext(this.injector, () => {
      effect(() => {
        this.personalForm = this.fromBuild.group({
          name: [this.profileService.user().name, [Validators.required]],
          tel: [this.profileService.user().tel, [Validators.required]],
          whats_app: [this.profileService.user().whats_app, [Validators.required]]
        });

        this.addressForm = this.fromBuild.group({
          postal_code: [this.profileService.user().address.postal_code, [Validators.required]],
          street: [this.profileService.user().address.street, [Validators.required]],
          neighborhood: [this.profileService.user().address.neighborhood, [Validators.required]],
          city: [this.profileService.user().address.city, [Validators.required]],
          state: [this.profileService.user().address.state, [Validators.required]],
          country: [this.profileService.user().address.country, [Validators.required]]
        });
      });
    });
  }



  async savePersonal() {
    this.profileService.updateUser(this.personalForm.value)
  }

  async saveAddress() {
    this.profileService.updateAddress(this.addressForm.value)

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



}

