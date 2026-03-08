import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FashionApiService } from '../../services/fashion-api.service';
import { Fashion } from '../../models/fashion.model';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    allFashions: Fashion[] = [];
    groupedFashions: { style: string; items: Fashion[] }[] = [];
    styles: string[] = [];
    searchStyle = '';
    errMessage = '';

    constructor(private _service: FashionApiService) { }

    ngOnInit() {
        this.loadAll();
    }

    loadAll() {
        this._service.getFashions().subscribe({
            next: (data) => {
                this.allFashions = data;
                this.buildGroups(data);
                this.styles = [...new Set(data.map(f => f.style))];
            },
            error: (err) => { this.errMessage = err; }
        });
    }

    buildGroups(fashions: Fashion[]) {
        const map = new Map<string, Fashion[]>();
        fashions.forEach(f => {
            if (!map.has(f.style)) map.set(f.style, []);
            map.get(f.style)!.push(f);
        });
        this.groupedFashions = Array.from(map.entries()).map(([style, items]) => ({ style, items }));
    }

    search() {
        if (!this.searchStyle.trim()) {
            this.buildGroups(this.allFashions);
        } else {
            this._service.getFashionsByStyle(this.searchStyle.trim()).subscribe({
                next: (data) => { this.buildGroups(data); },
                error: (err) => { this.errMessage = err; }
            });
        }
    }

    filterByStyle(style: string) {
        this.searchStyle = style;
        this.search();
    }

    clearSearch() {
        this.searchStyle = '';
        this.buildGroups(this.allFashions);
    }
}
