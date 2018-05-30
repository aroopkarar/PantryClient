import { PageManagerService } from './../services/page-manager.service';
import { DataManagerService } from './../services/data-manager.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-descprition',
  templateUrl: './descprition.component.html',
  styleUrls: ['./descprition.component.css']
})
export class DescpritionComponent implements OnInit {

  page: string;
  constructor(private dataManagerService: DataManagerService,private pageManagerService: PageManagerService) { 
      this.dataManagerService.getProducts();
  }

  ngOnInit() {
      this.pageManagerService.getCurrentPage().subscribe((res)=>{
        this.page= res;
        console.log('##Default Page: '+this.page);
      });
  }

}
