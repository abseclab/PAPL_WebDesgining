import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseOwnerRegistrationComponent} from './house-owner-registration/house-owner-registration.component';
import{AgreementTypeMasterComponent} from './agreement-type-master/agreement-type-master.component';
import{AgreementMasterComponent} from './agreement-master/agreement-master.component';
import { UnitRegistrationComponent } from './unit-registration/unit-registration.component';
import { HouseRegistrationComponent } from './house-registration/house-registration.component';
import {  UtilityCalculationComponent } from './utility-calculation/utility-calculation.component';
import { UnitBookingComponent } from './unit-booking/unit-booking.component';
import { AddLegalHeirComponent } from './add-legal-heir/add-legal-heir.component';
import { PaymentModeComponent } from './payment-mode/payment-mode.component';
import { HouseOwnerRegistrationPaymentModeBankAcComponent } from './house-owner-registration-payment-mode-bank-ac/house-owner-registration-payment-mode-bank-ac.component';
import { HouseOwnerRegistrationPaymentModeUPIComponent } from './house-owner-registration-payment-mode-upi/house-owner-registration-payment-mode-upi.component';
import { AddLegalHeirPaymentModeUPIComponent } from './add-legal-heir-payment-mode-upi/add-legal-heir-payment-mode-upi.component';
import { AddLegalHeirPaymentModeBankAcComponent } from './add-legal-heir-payment-mode-bank-ac/add-legal-heir-payment-mode-bank-ac.component';

const routes: Routes = [
  {
    path: 'portal/house-owner-registration',
    component: HouseOwnerRegistrationComponent
  },
  {
    path: 'portal/agreement-type-master',
    component: AgreementTypeMasterComponent
  },
  {
    path: 'portal/unit-registration',
    component: UnitRegistrationComponent
  },
  {
    path: 'portal/house-registration',
    component: HouseRegistrationComponent
  },
  {
    path: 'portal/agreement-master',
    component: AgreementMasterComponent
  },
  {
    path: 'portal/utility-calculation',
    component: UtilityCalculationComponent
  },
  {
    path: 'portal/unit-booking',
    component: UnitBookingComponent
  },
  {
    path: 'portal/add-legal-heir',
    component: AddLegalHeirComponent
  },
  {
    path: 'portal/payment-mode',
    component: PaymentModeComponent
  },
  {
    path: 'portal/house-owner-registration-payment-mode-bank-ac',
    component: HouseOwnerRegistrationPaymentModeBankAcComponent
  },
  {
    path: 'portal/house-owner-registration-payment-mode-upi',
    component: HouseOwnerRegistrationPaymentModeUPIComponent
  },
  {
    path: 'portal/add-legal-heir-payment-mode-upi',
    component: AddLegalHeirPaymentModeUPIComponent
  },
  {
    path: 'portal/add-legal-heir-payment-mode-bank-ac',
    component: AddLegalHeirPaymentModeBankAcComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
