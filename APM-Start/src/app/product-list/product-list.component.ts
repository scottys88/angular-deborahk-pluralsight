import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from './product-service.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage = false;
  starRating: Product[];
  products: Product[];


  constructor(private productService: ProductService) {

   }


  private filteredProducts: Product[];

  _listFilter: string;
  public get listFilter(): string {
    return this._listFilter;
  }
  public set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }


  ngOnInit() {
    console.log('On init');
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
  }

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImages(): void {
    this.showImage = !this.showImage;
  }

  onNotify(message: string) {
    this.pageTitle = message;
  }

}
