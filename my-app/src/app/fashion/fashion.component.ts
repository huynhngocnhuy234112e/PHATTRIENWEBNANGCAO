import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FashionAPIService } from '../fashion-api.service';

@Component({
    selector: 'app-fashion',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './fashion.component.html',
    styleUrls: ['./fashion.component.css']
})
export class FashionComponent {
    fashions: any;
    errMessage: string = ''

    constructor(public _service: FashionAPIService) {
        this._service.getFashions().subscribe({
            next: (data) => { this.fashions = data },
            error: (err) => { this.errMessage = err }
        })
    }
}
