import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { LowjShopFormService } from 'src/app/services/lowj-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  totalQuantity: number = 0;
  totalPrice: number = 0;


  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(private formBuilder: FormBuilder,
    private lowjShopFormService: LowjShopFormService) { }

  ngOnInit(): void {
    this.createCheckoutForm();
    this.getCountries();
  }

  createCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    })

    // get credit card months
    let startMonth = new Date().getMonth() + 1;
    this.lowjShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => this.creditCardMonths = data
    )
    // get credit card years
    this.lowjShopFormService.getCreditCardYears().subscribe(
      data => this.creditCardYears = data
    )
  }

  getCountries() {
    this.lowjShopFormService.getCountries().subscribe(
      data => this.countries = data
    )
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup.value.country.code;
    console.log(`countryCode: ${countryCode}`)

    this.lowjShopFormService.getStates(countryCode).subscribe(
      data => {
        if (formGroupName == "shippingAddress") {
          this.shippingAddressStates = data;
        } else {
          this.billingAddressStates = data;
        }
        //select first element by default
        formGroup.get('state').setValue(data[0]);
      }
    )

  }

  onSubmit() {
    console.log("Handling the submit button: ");
    console.log('customer', this.checkoutFormGroup.get('customer')!.value);
    console.log('shippingAddress', this.checkoutFormGroup.get('shippingAddress')!.value);
    console.log('billingAddress', this.checkoutFormGroup.get('billingAddress')!.value);
    console.log('creditCard', this.checkoutFormGroup.get('creditCard')!.value);

  }

  copy(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value);
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const theCurrentYear = new Date().getFullYear();
    const theSelectedYear = Number(creditCardFormGroup.value.expirationYear);

    console.log(`theCurrentYear: ${theCurrentYear}`);
    console.log(`theSelectedYear ${theSelectedYear}`);

    let startMonth: number = new Date().getMonth() + 1;

    if (theCurrentYear != theSelectedYear) {
      startMonth = 1;
    }

    console.log(`start month: ${startMonth}`)

    this.lowjShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    )

  }
}


