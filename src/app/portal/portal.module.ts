import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalRoutingModule } from './portal-routing.module';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { HouseOwnerRegistrationComponent } from './house-owner-registration/house-owner-registration.component';
import { UnitRegistrationComponent } from './unit-registration/unit-registration.component';
import { AgreementTypeMasterComponent } from './agreement-type-master/agreement-type-master.component';
import { HouseRegistrationComponent } from './house-registration/house-registration.component';
import { AgreementMasterComponent } from './agreement-master/agreement-master.component';
import { UtilityCalculationComponent } from './utility-calculation/utility-calculation.component';
import { UnitBookingComponent } from './unit-booking/unit-booking.component';
import {PortalServiceService} from './serviceapi/portal-service.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HouseOwnerRegistrationComponent,
    UnitRegistrationComponent,
    AgreementTypeMasterComponent,
    HouseRegistrationComponent,
    AgreementMasterComponent,
    UtilityCalculationComponent,
    UnitBookingComponent,
    
    
    
    
    
  ],
  providers: [PortalServiceService],
  imports: [
    CommonModule,
    PortalRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PortalModule { }
