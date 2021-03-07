import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SnackBarService } from 'src/app/common/snackBar/snackBar.service';
import { MappingsDialogComponent } from './mappings-dialog/mappings-dialog.component';
import { MappingsService } from './services/mappings.service';


export interface MappingsElement {
  sName: string;
  sCode: string;
  pNames: string[];
}

@Component({
  selector: 'app-mappings',
  templateUrl: './mappings.component.html',
  styleUrls: ['./mappings.component.css']
})
export class MappingsComponent implements OnInit {

  displayedColumns: string[] = ['sName','sCode', 'pNames'];
  dataSource : MatTableDataSource<MappingsElement>;
  constructor(private mappingsService: MappingsService,
              public dialog: MatDialog,
              private snackBar: SnackBarService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<MappingsElement>();
    this.loadData();
  }

  loadData() {
    this.mappingsService
        .getMappings()
        .subscribe( (data: MappingsElement[]) => {
            this.dataSource.data = data;
        });
  }

  openDialog(el: MappingsElement, pName: string) {
    const dialogRef = this.dialog.open(MappingsDialogComponent, {
      width: '280px',
      data:
      {
        pName: pName,
        sName: el.sName,
        options: this.dataSource.data.map(x=>x.sName)
      }
    });
    console.log(pName);
  }


  onDeleteMapping(row:MappingsElement, pName:string){
    const msg = 'Θέλετε να διαγραφεί η αντιστοίχιση. ' + pName;
    if (confirm(msg)) {        
      this.mappingsService.deleteMapping(pName).subscribe(x=>{
        this.snackBar.showSuccessMsg('Επιτυχής διαγραφή αντιστοίχισης.');
        
        const index = row.pNames.indexOf(pName)
        if (index >= 0) {
          row.pNames.splice(index, 1);
        }
      })
    }
  }

}