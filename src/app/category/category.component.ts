import { CategoryGroup } from './../modal/Modals';
import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../services/data-manager.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  cg: CategoryGroup;
  constructor(private dataManagerService:DataManagerService) { 
    this.dataManagerService.getCategoryGroup().subscribe((res:CategoryGroup)=>
   {
    this.cg = res;
   });
  }

  getProductsByCategoryGroupAndCategory(categoryGroupid,categoryid)
  {
    console.log('categoryGroupid='+categoryGroupid);
    console.log('categoryid='+categoryid);
    this.dataManagerService.getProductsByCategoryGroupAndCategory(categoryGroupid,categoryid);
  }

  getProductsByCategoryGroup(categoryGroupid)
  {
    console.log('categoryGroupid='+categoryGroupid);
    this.dataManagerService.getProductsByCategoryGroup(categoryGroupid);
  }

  ngOnInit() {
  }

}
