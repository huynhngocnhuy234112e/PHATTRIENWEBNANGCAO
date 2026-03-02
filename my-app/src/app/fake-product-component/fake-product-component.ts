import { Component, OnInit } from '@angular/core';
import { FakeProductService } from '../my-service/fake-product-service';
@Component({
selector: 'app-fake-product',
templateUrl: './fake-product-component.html',
styleUrls: ['./fake-product-component.css'],
standalone: false
})
export class FakeProductComponent implements OnInit {
data: any = [];
errMessage: string = '';
constructor(private _service: FakeProductService) {}

ngOnInit(): void {
    this._service.getFakeProductData().subscribe({
    next: (data) => {
        console.log('Data received:', data);
        this.data = data;
    },
    error: (err) => {
        console.error('Error:', err);
        this.errMessage = err;
    },
    });
}
}