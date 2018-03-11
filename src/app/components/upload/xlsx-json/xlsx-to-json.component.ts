import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';

@Component({
  selector: 'app-xlsx-to-json',
  templateUrl: './xlsx-to-json.component.html',
  styleUrls: ['./xlsx-to-json.component.scss']
})
export class XlsxToJsonComponent implements OnInit {

  private data;
  @Output() clickSubmit = new EventEmitter<any>();
	ngOnInit() {
		
	}

	constructor(
		private el: ElementRef
	) { }

	onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = Array<Array<any>>(XLSX.utils.sheet_to_json(ws, {header: 1}));
    };
    reader.readAsBinaryString(target.files[0]);
  }

  onSubmit() {
    const data = this.convertToJsonObject(this.data[0]);
    this.clickSubmit.emit(data);
  }

  convertToJsonObject(data) {
    let newData = [];
    for(let i = 1; i<data.length; i++) {
      let myObject: any = {};
      for(let s=0; s<data[0].length; s++) {
        // myObject.append(data[0][s], data[i][s]);
        const name = data[0][s];
        myObject[name] = data[i][s];
        
      }
      newData.push(myObject);
    }
    return newData;
  }

}
