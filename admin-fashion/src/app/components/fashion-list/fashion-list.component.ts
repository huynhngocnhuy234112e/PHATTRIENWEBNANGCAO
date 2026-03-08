import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FashionApiService } from '../../services/fashion-api.service';
import { Fashion } from '../../models/fashion.model';

@Component({
    selector: 'app-fashion-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './fashion-list.component.html',
    styleUrls: ['./fashion-list.component.css']
})
export class FashionListComponent implements OnInit {
    fashions: Fashion[] = [];
    errMessage = '';

    constructor(private _service: FashionApiService, private router: Router) { }

    ngOnInit() {
        this.loadFashions();
    }

    loadFashions() {
        this._service.getFashions().subscribe({
            next: (data) => { this.fashions = data; },
            error: (err) => { this.errMessage = err; }
        });
    }

    addNew() {
        this.router.navigate(['/form']);
    }

    editFashion(id: string) {
        this.router.navigate(['/form', id]);
    }

    deleteFashion(id: string) {
        if (!confirm('Bạn có chắc muốn xóa Fashion này không?')) return;
        this._service.deleteFashion(id).subscribe({
            next: () => { this.loadFashions(); },
            error: (err) => { this.errMessage = err; }
        });
    }
}
