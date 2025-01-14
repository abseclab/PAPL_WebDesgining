import { Component } from '@angular/core';
import { PortalServiceService } from './../serviceapi/portal-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { ValidatorchklistService } from './../serviceapi/validatorchklist.service';

@Component({
  selector: 'app-agreement-type-master',
  templateUrl: './agreement-type-master.component.html',
  styleUrls: ['../../common.css', './agreement-type-master.component.css']
})
export class AgreementTypeMasterComponent {
  constructor(private ngxLoader: NgxUiLoaderService, private formBuilder: FormBuilder, private route: Router, public portalServ: PortalServiceService, private httpClient: HttpClient, public vldChkLst: ValidatorchklistService) { }
  ngOnInit(): void {
    this.getAllAgreementType();
  }
  tableData: any = [];
  aggrementType: any = '';
  aggreStDate: any = '';
  aggreEdDate: any = '';
  aggrementTypeDesc: any = '';
  aggreTypeId: any = '';

  errorMessages: any = {
    aggrementType: '',
    aggreStDate: '',
    aggreEdDate: '',
  };
  validateData() {
    let vSts = true;

    if (!this.vldChkLst.blankCheckWithoutAlert(this.aggrementType)) {
      vSts = false;
      this.errorMessages.aggrementType = 'Agreement Type is required.';
    } else {
      this.errorMessages.aggrementType = '';
    }

    if (!this.vldChkLst.blankCheckWithoutAlert(this.aggreStDate)) {
      vSts = false;
      this.errorMessages.aggreStDate = 'Start Date is required.';
    } else {
      this.errorMessages.aggreStDate = '';
    }

    if (!this.vldChkLst.blankCheckWithoutAlert(this.aggreEdDate)) {
      vSts = false;
      this.errorMessages.aggreEdDate = 'End Date is required.';
    } else {
      this.errorMessages.aggreEdDate = '';
    }

    return vSts;
  }

  handleAlphanumericInput(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(/[^a-zA-Z0-9]/g, '');
    this.aggrementType = inputElement.value;
  }

  updateMinEndDate(): void {
    const startDateInput = document.getElementById('filter_sdate') as HTMLInputElement;
    if (startDateInput) {
      const startDateValue = startDateInput.value;
      // Set the minimum allowed value for the end date to the selected start date
      document.getElementById('filter_edate')?.setAttribute('min', startDateValue);
      // Ensure the end date is always greater than or equal to the start date
      if (this.aggreEdDate < startDateValue) {
        this.aggreEdDate = startDateValue;
      }
    }
  }

  saveAgreementType() {
    let vSts = this.validateData();
    if (vSts) {
      let param = {
        "aggreEdDate": this.aggreEdDate,
        "aggreStDate": this.aggreStDate,
        "aggreTypeId": null,
        "aggreTypeName": this.aggrementType,
        "description": this.aggrementTypeDesc
      };
      if (this.aggreStDate < this.aggreEdDate) {
        this.ngxLoader.start();
      this.portalServ.addAgreementType(param).subscribe(res => {
        this.ngxLoader.stop();
        if (res.responseCode == 200 || res.responseCode == 201) {
          this.aggreEdDate = '';
          this.aggreStDate = '';
          this.aggrementType = '';
          this.aggrementTypeDesc = '';
          Swal.fire({
            icon: 'success',
            text: 'Record Saved Successfully'
          });
          this.getAllAgreementType();
        } else {
          Swal.fire({
            icon: 'error',
            text: res.message
          });
        }

      }, error => {
        this.ngxLoader.stop();
        Swal.fire({
          icon: 'error',
          text: 'Error in Data Insertion'
        });
      });
        
      }

      else{
        this.errorMessages.aggreStDate = 'Start date can not be greater than end date.';

      }
      
    }
  }
  getAllAgreementType() {
    let param = {};
    this.ngxLoader.start();
    this.portalServ.getAllAgreementType(param).subscribe(res => {
      this.ngxLoader.stop();
      console.log("tabledata", res)
      this.tableData = res.data

    }, error => {
      this.ngxLoader.stop();
    });

  }
  deleteAgreementType(aggreTypeId: any = 0) {
    Swal.fire({
      //icon: 'warning',
      text: "Are you sure you want to Delete the details?",
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      cancelButtonColor: '#df1141'
    }).then((result) => {
      if (result.isConfirmed) {
        let param = {
          "id": aggreTypeId
        };
        this.ngxLoader.start();
        this.portalServ.deleteAgreementType(param).subscribe(res => {
          this.ngxLoader.stop();
          if (res.responseCode == 200) {
            Swal.fire({
              icon: 'success',
              text: 'Record Deleted Successfully'
            });
            this.getAllAgreementType();
          } else {
            Swal.fire({
              icon: 'error',
              text: res.message
            });
          }
        }, error => {
          this.ngxLoader.stop();
          Swal.fire({
            icon: 'error',
            text: 'Error'
          });
        });
      }
    });

  }
  editAgreementType(aggreTypeId: any, aggreTypeName: any, aggreStDate: any, description: any, aggreEdDate: any) {
    this.aggreTypeId = aggreTypeId;
    this.aggrementType = aggreTypeName;
    this.aggreStDate = aggreStDate.split('T')[0];
    this.aggrementTypeDesc = description;
    this.aggreEdDate = aggreEdDate.split('T')[0];
  }
  updateAgreementType() {
    let vSts = this.validateData();
    if (vSts) {
      let param = {
        "aggreEdDate": this.aggreEdDate,
        "aggreStDate": this.aggreStDate,
        "aggreTypeId": this.aggreTypeId,
        "aggreTypeName": this.aggrementType,
        "description": this.aggrementTypeDesc
      };
      if (this.aggreStDate < this.aggreEdDate) {
        this.ngxLoader.start();
        this.portalServ.updateAgreementType(param).subscribe(res => {

          this.ngxLoader.stop();
          if (res.responseCode == 400) {
            this.aggreEdDate = '';
            this.aggreStDate = '';
            this.aggrementType = '';
            this.aggrementTypeDesc = '';
            this.aggreTypeId = '';
            Swal.fire({
              icon: 'error',
              text: res.message
            });
          } else {
            this.aggreEdDate = '';
            this.aggreStDate = '';
            this.aggrementType = '';
            this.aggrementTypeDesc = '';
            this.aggreTypeId = '';
            Swal.fire({
              icon: 'success',
              text: 'Record Updated Successfully'
            });
            this.getAllAgreementType();



          }

        }, error => {
          this.ngxLoader.stop();
          Swal.fire({
            icon: 'error',
            text: 'Error in Data Update'
          });
        });
      }
      else {
        this.errorMessages.aggreStDate = 'Start date can not be greater than end date.';

      }

    }
  }
}
