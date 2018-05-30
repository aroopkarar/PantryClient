import { DataManagerService } from './../../services/data-manager.service';
import { Observable } from 'rxjs/Observable';
import { Product, Subcategory } from './../../modal/Modals';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adminaddproduct',
  templateUrl: './adminaddproduct.component.html',
  styleUrls: ['./adminaddproduct.component.css']
})
export class AdminaddproductComponent implements OnInit,OnDestroy {

  parentRouteId: number;
  private sub: any;

  product: Product = new Product();
  subcategories$ : Observable<Subcategory[]>;
  constructor(private dataManagerService: DataManagerService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    //this.subcategories$ =this.dataManagerService.getAllSubCategories();

    // Get parent ActivatedRoute of this route.
    this.sub = this.route.parent.params.subscribe(params => {
        this.parentRouteId = +params["id"];
        console.log('Getting Parent param admin id: '+this.parentRouteId);
      });
  }

  save(product)
  {
    console.log(product);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
