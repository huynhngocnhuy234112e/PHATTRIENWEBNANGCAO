import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FashionAPIService } from '../fashion-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-fashion-detail',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './fashion-detail.component.html',
    styleUrls: ['./fashion-detail.component.css']
})
export class FashionDetailComponent {
    fashion: any;
    fashionId: string = '';
    errMessage: string = ''
    constructor(private _service: FashionAPIService, private router: Router, private activeRouter: ActivatedRoute) {
        activeRouter.paramMap.subscribe((params) => {
            let id = params.get("id")
            if (id != null) {
                this.fashionId = id;
                this.searchFashion(id)
            }
        })
    }

    searchFashion(id: string) {
        this._service.getFashion(id).subscribe({
            next: (data) => { this.fashion = data },
            error: (err) => { this.errMessage = err }
        })
    }
}
