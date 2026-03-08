import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FashionApiService } from '../../services/fashion-api.service';
import { Fashion } from '../../models/fashion.model';

@Component({
    selector: 'app-fashion-detail',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './fashion-detail.component.html',
    styleUrls: ['./fashion-detail.component.css']
})
export class FashionDetailComponent implements OnInit {
    fashion: Fashion | null = null;
    errMessage = '';

    constructor(
        private _service: FashionApiService,
        private activeRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.activeRoute.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this._service.getFashion(id).subscribe({
                    next: (data) => { this.fashion = data; },
                    error: (err) => { this.errMessage = err; }
                });
            }
        });
    }
}
