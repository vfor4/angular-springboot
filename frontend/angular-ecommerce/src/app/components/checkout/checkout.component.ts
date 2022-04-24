import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { LowjShopFormService } from 'src/app/services/lowj-shop-form.service';
import { LowjShopValidators } from 'src/app/validators/lowj-shop-validators';

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
        firstName: new FormControl('', [Validators.required,
        Validators.minLength(2),
        LowjShopValidators.notOnlyWhiteSpace]),
        lastName: new FormControl('', [Validators.required,
        Validators.minLength(2),
        LowjShopValidators.notOnlyWhiteSpace]),

        email: new FormControl('',
          [Validators.required, Validators.pattern(('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'))])
      }),
      shippingAddress: this.formBuilder.group({
        country: new FormControl('', [Validators.required]),
        street: new FormControl('', [Validators.required,
        Validators.minLength(2),
        LowjShopValidators.notOnlyWhiteSpace]),
        city: new FormControl('', [Validators.required,
        Validators.minLength(2),
        LowjShopValidators.notOnlyWhiteSpace]),
        state: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required,
        Validators.minLength(2),
        LowjShopValidators.notOnlyWhiteSpace])
      }),
      billingAddress: this.formBuilder.group({
        country: new FormControl('', [Validators.required]),
        street: new FormControl('', [Validators.required,
        Validators.minLength(2),
        LowjShopValidators.notOnlyWhiteSpace]),
        city: new FormControl('', [Validators.required,
        Validators.minLength(2),
        LowjShopValidators.notOnlyWhiteSpace]),
        state: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required,
        Validators.minLength(2),
        LowjShopValidators.notOnlyWhiteSpace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2),LowjShopValidators.notOnlyWhiteSpace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
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

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      console.log('invalid')
    }

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

  // <div *ngIf="firstName.invalid &&(firstName.dirty || firstName.touched)" refe to first name at html page
  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName')
  }
  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName')
  }
  get email() {
    return this.checkoutFormGroup.get('customer.email')
  }

  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country') };
  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street') };
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city') };
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state') };
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode') };

  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country') };
  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street') };
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city') };
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state') };
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode') };

  get cardType() { return this.checkoutFormGroup.get('creditCard.cardType') };
  get nameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard') };
  get cardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber') };
  get securityCode() { return this.checkoutFormGroup.get('creditCard.securityCode') };
}


