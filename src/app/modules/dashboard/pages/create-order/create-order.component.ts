import { Component, inject, OnInit } from '@angular/core';
import { NavBarComponent } from "../../../../shared/nav-bar/nav-bar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BreadCrumbsComponent } from "../../../../shared/bread-crumbs/bread-crumbs.component";
import { OrdersService } from 'src/app/services/orders/orders.service';


@Component({
  selector: 'app-create-order',
  standalone:true,
  imports: [NavBarComponent, ReactiveFormsModule, CommonModule, BreadCrumbsComponent],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss'
})
export class CreateOrderComponent implements OnInit {
  registrationForm: FormGroup = new FormGroup({});
  packageReceiver: FormGroup = new FormGroup({});
  address: FormGroup = new FormGroup({});
  isSubmitting = false;
  state_default: boolean = true;

  fromBuild:FormBuilder = inject(FormBuilder)
  orderService:OrdersService = inject(OrdersService)


  constructor() {}

  ngOnInit() {

    this.packageReceiver = this.fromBuild.group({
      name: ['', [Validators.required]],
      cpf: ['', [Validators.required, this.validateCPF]],
      phone: ['', [Validators.required]],
    })

    this.address = this.fromBuild.group({
      postal_code: ['', [Validators.required]],
      street: ['', [Validators.required]],
      neighborhood: ['', [Validators.required]],
      city: ['Porto Velho', [Validators.required]],
      state: ['RO', [Validators.required]],
      country: ['Brasil', [Validators.required]],
    })

    this.registrationForm = this.fromBuild.group({
      product_name: ['', [Validators.required]],
      quantity: [0, [Validators.required]],
      size: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      to_delivery: [false, [Validators.required]],
      package_receiver:this.packageReceiver,
      address:this.address,
      observation: ['']
    });
  }

  onSubmit() {
    if(this.registrationForm.valid){
      this.orderService.createOrders(this.registrationForm.value)
    }

  }

  validateCPF(control: any) {
    const cpf = control.value.replace(/[^\d]+/g, '');
    if (cpf.length !== 11) return { invalidCpf: true };
    // Add more CPF validation logic if needed
    return null;
  }

  isFieldInvalid(fieldName: string , formGroup:FormGroup): boolean {

    const field = formGroup.get(fieldName);
    return field!.invalid && (field!.dirty || field!.touched);
  }

  async onCepBlur() {
    const cep = this.registrationForm.get('cep')?.value.replace(/[^\d]+/g, '');
    console.log(cep)
  }

}
