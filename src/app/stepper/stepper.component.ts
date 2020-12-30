import {Component, OnInit, ViewChild, Input} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/stepper/interfaces/product';
import { Profit } from './interfaces/profit.interface';
import { ImportDTO } from './import-page/dto/import-dto';
import { TableComponent } from './table/table.component';
import { StepperComponentService } from './services/stepper.component.service';

@Component({
  selector: 'app-stepper-component',
  templateUrl: 'stepper.component.html',
  styleUrls: ['stepper.component.css'],
})

export class StepperComponent implements OnInit {
  isLinear = false;
  dataSource: MatTableDataSource<Product>;
  invoiceDate: string;
  @ViewChild('table2') tableStep2: TableComponent;

  constructor( private service: StepperComponentService ) {}

  ngOnInit() {
    this.dataSource =  new MatTableDataSource<Product>();
  }

  updateDataSource(response: ImportDTO) {

    this.dataSource.data = [];
    response.data.forEach( (elem: Product) => {
      elem = new Product(elem);
      elem.defaultProfit = { value: elem.profitPercentage, class: '' } as Profit;
      elem.updateTrendColumn();
      this.dataSource.data.push(elem);
    });
    this.invoiceDate = response.invoiceDate;
    this.dataSource._updateChangeSubscription();
    this.tableStep2.updateDownloadButton();

    console.log(response);
  }

  downloadHistory() {
    this.service.downloadHistoryDoc().subscribe((data: Blob) => {
      const downloadURL = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'history.docx';
      link.click();
    });
  }
}
