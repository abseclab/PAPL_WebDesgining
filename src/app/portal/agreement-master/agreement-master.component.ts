import { Component } from '@angular/core';
import { PortalServiceService } from './../serviceapi/portal-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { ValidatorchklistService } from './../serviceapi/validatorchklist.service';
import * as moment from 'moment';

@Component({
  selector: 'app-agreement-master',
  templateUrl: './agreement-master.component.html',
  styleUrls: ['../../common.css', './agreement-master.component.css']
})
export class AgreementMasterComponent {
  constructor(private ngxLoader: NgxUiLoaderService, private formBuilder: FormBuilder, private route: Router, public portalServ: PortalServiceService, private httpClient: HttpClient, public vldChkLst: ValidatorchklistService) { }
  ngOnInit(): void {
    this.getAllState();
    // this.getAllSbu();
    // this.getAllPlant();
    this.getAllOwner();
    this.getAllAgreementType();
    this.getAllAgreement();
    this.getallhouse()
  }
  tableData: any = [];
  allState: any = [];
  allSbu: any = [];
  allPlant: any = [];
  allOwner: any = [];
  getAllAgreementTypeData: any = [];
  aggreState: any = 0;
  aggreSbu: any = 0;
  aggrePlant: any = 0;
  aggreOwner: any = 0;
  aggreHouse: any = 0;
  aggreUpload: any;
  aggreAggrementType: any = 0;
  aggreElectricBill: any = '';
  aggreWaterBill: any = '';
  aggreMonthlyRent: any = '';
  aggrePeriod: any = '';
  aggreStartDate: any = '';
  aggreEndDate: any = '';
  aggreId: any = '';
  selectedCropFileNames: any = '';
  selectedCropFiles: any = [];
  cropPreviews: any = [];
  getallhouseList: any = [];
  errorMessages: any = {
    aggreState: '',
    aggreSbu: '',
    aggrePlant: '',
    aggreOwner: '',
    aggreHouse: '',
    aggreAggrementType: '',
    aggreElectricBill: '',
    aggreWaterBill: '',
    aggreUpload: '',
    aggreMonthlyRent: '',
    aggrePeriod: '',
    aggreStartDate: '',
    aggreEndDate: '',
  };
  getVal(val: any) {
    this.aggreElectricBill = val.checked;
  }
  getValaggreWaterBill(val: any) {
    this.aggreWaterBill = val.checked;
  }
  deleteAgreement(aggreTypeId: any = 0) {
    Swal.fire({
      icon: 'warning',
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
        this.portalServ.deleteAgreement(param).subscribe(res => {
          this.ngxLoader.stop();
          if (res.responseCode == 200) {
            Swal.fire({
              icon: 'success',
              text: 'Record Deleted Successfully'
            });
            this.getAllAgreement();
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
  getAllState() {
    let param = {};
    this.ngxLoader.start();
    this.portalServ.getAllState(param).subscribe(res => {
      this.ngxLoader.stop();
      if (res.length > 0) {
        this.allState = res;
      } else {
        this.allState = [];
      }
    }, error => {
      this.ngxLoader.stop();
    });
  }

  getSbu(aggreState: any) {
    console.log(aggreState);
    this.ngxLoader.start();
    this.portalServ.get('PAPL/get/sbu/by/' + aggreState)
      .subscribe(res => {
        console.log(res);
        this.allSbu = res
        this.ngxLoader.stop();

      })

  }

  getplant(aggreSbu: any) {
    this.ngxLoader.start();
    this.portalServ.get('PAPL/get/plant/by/' + aggreSbu)
      .subscribe(res => {
        console.log(res);
        this.allPlant = res
        this.ngxLoader.stop();

      })
  }


  getAllOwner() {
    let param = {};
    this.ngxLoader.start();
    this.portalServ.getAllOwner(param).subscribe(res => {
      this.allOwner = res.data;
      console.log(res);
      this.ngxLoader.stop();

      console.log(this.allOwner);

    }, error => {
      this.ngxLoader.stop();
    });
  }
  getAllPlant() {
    let param = {};
    this.ngxLoader.start();
    this.portalServ.getAllPlant(param).subscribe(res => {
      this.ngxLoader.stop();
      if (res.length > 0) {
        this.allPlant = res;
      } else {
        this.allPlant = [];
      }
    }, error => {
      this.ngxLoader.stop();
    });
  }
  getAllSbu() {
    let param = {};
    this.ngxLoader.start();
    this.portalServ.getAllSbu(param).subscribe(res => {
      this.ngxLoader.stop();
      if (res.length > 0) {
        this.allSbu = res;
      } else {
        this.allSbu = [];
      }
    }, error => {
      this.ngxLoader.stop();
    });
  }
  getAllAgreementType() {
    let param = {};
    this.ngxLoader.start();
    this.portalServ.getAllAgreementType(param).subscribe(res => {
      console.log(res);
      this.ngxLoader.stop();

      this.getAllAgreementTypeData = res.data;


    }, error => {
      this.ngxLoader.stop();
    });
  }
  getAllAgreement() {
    let param = {};
    this.ngxLoader.start();
    this.portalServ.getAllAgreement(param).subscribe(res => {
      console.log(res);
      this.ngxLoader.stop();

      this.tableData = res.data;

    }, error => {
      this.ngxLoader.stop();
    });
  }

  getallhouse() {
    this.portalServ.get("PAPL/getAllHouse")
      .subscribe((res: any) => {

        this.getallhouseList = res


        console.log(res);
      })
  }
  validateData() {
    let vSts = true;
    if (!this.vldChkLst.selectDropdownWithoutAlert(this.aggreState)) {
      vSts = false;
      this.errorMessages.aggreState = 'State is required';
    }
    else {
      this.errorMessages.aggreState = '';

    }

    if (!this.vldChkLst.selectDropdownWithoutAlert(this.aggreSbu)) {
      vSts = false;
      this.errorMessages.aggreSbu = 'SBU is required.';
    }
    else {
      this.errorMessages.aggreSbu = '';

    }
    if (!this.vldChkLst.selectDropdownWithoutAlert(this.aggrePlant)) {
      vSts = false;
      this.errorMessages.aggrePlant = 'Plant is required.';

    }
    else {
      this.errorMessages.aggrePlant = '';

    }
    if (!this.vldChkLst.selectDropdownWithoutAlert(this.aggreOwner)) {
      vSts = false;
      this.errorMessages.aggreOwner = 'Owner Name is required.';

    }
    else {
      this.errorMessages.aggreOwner = '';

    }
    if (!this.vldChkLst.selectDropdownWithoutAlert(this.aggreHouse)) {
      vSts = false;
      this.errorMessages.aggreHouse = 'House is required.';

    }
    else {
      this.errorMessages.aggreHouse = '';

    }
    if (!this.vldChkLst.selectDropdownWithoutAlert(this.aggreAggrementType)) {
      vSts = false;
      this.errorMessages.aggreAggrementType = 'Agreement type is required.';

    }
    else {
      this.errorMessages.aggreAggrementType = '';

    }

    if (!this.vldChkLst.blankCheckWithoutAlert(this.aggreMonthlyRent)) {
      vSts = false;
      this.errorMessages.aggreMonthlyRent = 'Monthly rent is required.';

    }
    else {
      this.errorMessages.aggreMonthlyRent = '';

    }
    if (!this.vldChkLst.blankCheckWithoutAlert(this.aggrePeriod)) {
      vSts = false;
      this.errorMessages.aggrePeriod = 'Agreement Period is required.';

    }
    else {
      this.errorMessages.aggrePeriod = '';

    }
    if (!this.vldChkLst.blankCheckWithoutAlert(this.aggreStartDate)) {
      vSts = false;
      this.errorMessages.aggreStartDate = 'Start date is required.';

    }
    else {
      this.errorMessages.aggreStartDate = '';

    }
    if (!this.vldChkLst.blankCheckWithoutAlert(this.aggreEndDate)) {
      vSts = false;
      this.errorMessages.aggreEndDate = 'End date is required.';
    }
    else {
      this.errorMessages.aggreEndDate = '';
    }


    return vSts;
  }
  editAgreement(aggreId: any, stateId: any, sbuId: any, plantId: any, ownerId: any, houseId: any, aggreTypeId: any, rent: any, rentPeriod: any, rentStartDt: any, rentEndDt: any, withElectricBill: any, withWaterBill: any) {
    
    window.scrollTo({ top: 0, behavior: 'smooth' });

    Swal.fire({
      icon: 'warning',
      text: "Are you sure you want to Edit the details?",
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      cancelButtonColor: '#df1141'
    }).then((result) => {

      if (result.isConfirmed) {
        this.aggreState = stateId;
        this.aggreSbu = sbuId;
        this.aggrePlant = plantId;
        this.aggreOwner = ownerId;
        this.aggreHouse = houseId;
        this.aggreAggrementType = aggreTypeId;
        this.aggreElectricBill = withElectricBill;
        this.aggreWaterBill = withWaterBill;
        this.aggreMonthlyRent = rent;
        this.aggrePeriod = rentPeriod;
        this.aggreStartDate = rentStartDt.split('T')[0];
        this.aggreEndDate = rentEndDt.split('T')[0];
        this.aggreId = aggreId;

        this.getSbu(stateId);
        this.getplant(sbuId);
        window.scrollTo({ top: 0, behavior: 'smooth' });


      }
    });
  }
  saveAggreement() {
    let vSts = this.validateData();
    if (vSts) {
      let param = {
        "aggreAddr": "string",
        "aggreId": null,
        "agreementType": {
          "aggreTypeId": this.aggreAggrementType
        },
        "house": {
          "houseId": this.aggreHouse
        },
        "owner": {
          "ownerId": this.aggreOwner
        },
        "plant": {
          "plantId": this.aggrePlant
        },
        "rent": this.aggreMonthlyRent,
        "rentEndDt": this.aggreEndDate,
        "rentPeriod": this.aggrePeriod,
        "rentStartDt": this.aggreStartDate,
        "sbu": {
          "locationId": this.aggreSbu
        },
        "state": {
          "stateId": this.aggreState
        },
        "withElectricBill": this.aggreElectricBill,
        "withWaterBill": this.aggreWaterBill
      };
      // this.ngxLoader.start();
      this.portalServ.addAgreement(param).subscribe(res => {
        this.ngxLoader.stop();
        // if (res.responseCode == 200 || res.responseCode == 201) {
        this.aggreElectricBill = '';
        this.aggreWaterBill = '';
        this.aggreState = 0;
        this.aggreSbu = 0;
        this.aggreStartDate = '';
        this.aggrePeriod = '';
        this.aggreEndDate = '';
        this.aggreMonthlyRent = '';
        this.aggrePlant = 0;
        this.aggreOwner = 0;
        this.aggreAggrementType = 0;
        this.aggreHouse = 0;
        this.aggreUpload = '';
        Swal.fire({
          icon: 'success',
          text: 'Record Saved Successfully'
        }).then(() => {
          window.location.reload();

        });
        this.getAllAgreement();
        // } else {
        //   Swal.fire({
        //     icon: 'error',
        //     text: res.message
        //   });
        // }

      }, error => {
        this.ngxLoader.stop();
        Swal.fire({
          icon: 'error',
          text: 'Error in Data Insertion'
        });
      });
    }
  }
  updateAgreement() {
    let vSts = this.validateData();
    if (vSts) {
      let param = {
        "aggreAddr": "string",
        "aggreId": this.aggreId,
        "agreementType": {
          "aggreTypeId": this.aggreAggrementType
        },
        "house": {
          "houseId": this.aggreHouse
        },
        "owner": {
          "ownerId": this.aggreOwner
        },
        "plant": {
          "plantId": this.aggrePlant
        },
        "rent": this.aggreMonthlyRent,
        "rentEndDt": this.aggreEndDate,
        "rentPeriod": this.aggrePeriod,
        "rentStartDt": this.aggreStartDate,
        "sbu": {
          "locationId": this.aggreSbu
        },
        "state": {
          "stateId": this.aggreState
        },
        "withElectricBill": this.aggreElectricBill,
        "withWaterBill": this.aggreWaterBill
      };
      this.ngxLoader.start();
      this.portalServ.updateAgreement(param).subscribe(res => {
        this.ngxLoader.stop();
        // if (res.responseCode == 200 || res.responseCode == 201) {
        this.aggreElectricBill = '';
        this.aggreWaterBill = '';
        this.aggreState = 0;
        this.aggreSbu = 0;
        this.aggreStartDate = '';
        this.aggrePeriod = '';
        this.aggreEndDate = '';
        this.aggreMonthlyRent = '';
        this.aggrePlant = 0;
        this.aggreOwner = 0;
        this.aggreAggrementType = 0;
        this.aggreHouse = 0;
        Swal.fire({
          icon: 'success',
          text: 'Record Update Successfully'
        });
        // window.location.reload();
        this.getAllAgreement();
        // } else {
        //   Swal.fire({
        //     icon: 'error',
        //     text: res.message
        //   });
        // }

      }, error => {
        this.ngxLoader.stop();
        Swal.fire({
          icon: 'error',
          text: 'Error in Data Updation'
        });
      });
    }
  }
  selectFiles(event: any): void {
    this.selectedCropFileNames = '';
    this.selectedCropFiles = event.target.files;
    this.cropPreviews = [];

    if (!this.selectedCropFiles || this.selectedCropFiles.length === 0) {
      // No file selected, set an error message
      this.errorMessages.aggreUpload = 'No files selected';
      return;
    } else {
      // Clear the error message if a file is selected
      this.errorMessages.aggreUpload = '';
    }

    const file = this.selectedCropFiles[0];
    const fileType = file['type'];
    const fileSize = file['size'];
    const validPdfTypes = ['application/pdf', 'image/jpg', 'image/jpeg', 'image/png'];
    if (!validPdfTypes.includes(fileType)) {
      // invalid file type code goes here.
      Swal.fire({
        icon: 'error',
        text: 'Please select a valid  file'
      });
      return;
    }
    // if (fileSize>500000) {
    //   // invalid file size code goes here.
    //   Swal.fire({
    //    icon: 'error',
    //     text: 'Selected file must be in between 500kb'
    //   });
    //   return ;
    // }

    if (this.selectedCropFiles && this.selectedCropFiles[0]) {
      const numberOfFiles = this.selectedCropFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.cropPreviews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedCropFiles[i]);
        this.selectedCropFileNames = this.selectedCropFiles[i].name;
      }

    }
  }

  addMonthToDate(selectedDate: any, selectedMonth?: any) {
    // Parse the input date string to a JavaScript Date object
    const dateObject = new Date(selectedDate);
    selectedMonth = this.aggrePeriod;
    // Add the selected month to the current month
    dateObject.setMonth(dateObject.getMonth() + selectedMonth);

    // Format the resulting date to your preferred format (e.g., "MM/DD/YYYY")
    const formattedDate = `${dateObject.getMonth() + 1}/${dateObject.getDate()}/${dateObject.getFullYear()}`;
    console.log("formattedDate", formattedDate);

    // return formattedDate;
  }
  captureDate(): void {
    // const selectedMonth = this.aggrePeriod;
    // const date = new Date(this.aggreStartDate);
    // console.log(date);
    // const newDate = moment(date).add(selectedMonth, 'months').format('yyyy-MM-dd'); // Include day name in formatted date
    // this.aggreEndDate = newDate;
    // console.log(newDate);


    console.log('Date captured:', this.aggreStartDate);

    const newDate = moment(this.aggreStartDate).add(this.aggrePeriod, 'months');

    // Format the resulting date to your preferred format (e.g., "MM/DD/YYYY")
    const formattedDate = newDate.format('yyyy-MM-DD');
    console.log('formattedDate', formattedDate);
    this.aggreEndDate = formattedDate
  }


}
