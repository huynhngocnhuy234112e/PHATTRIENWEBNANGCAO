import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { FashionApiService } from '../../services/fashion-api.service';
import { Fashion } from '../../models/fashion.model';

@Component({
    selector: 'app-fashion-form',
    standalone: true,
    imports: [CommonModule, FormsModule, QuillModule],
    templateUrl: './fashion-form.component.html',
    styleUrls: ['./fashion-form.component.css']
})
export class FashionFormComponent implements OnInit {
    fashion = new Fashion();
    isEdit = false;
    errMessage = '';

    quillModules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'header': [1, 2, 3, false] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['blockquote', 'code-block'],
            ['link', 'image'],
            ['clean']
        ]
    };

    constructor(
        private _service: FashionApiService,
        private router: Router,
        private activeRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        const id = this.activeRoute.snapshot.paramMap.get('id');
        if (id) {
            this.isEdit = true;
            this._service.getFashion(id).subscribe({
                next: (data) => { this.fashion = data; },
                error: (err) => { this.errMessage = err; }
            });
        }
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.fashion.thumbnail = reader.result!.toString();
        };
    }

    save() {
        if (this.isEdit) {
            this._service.putFashion(this.fashion._id, this.fashion).subscribe({
                next: () => { this.router.navigate(['/list']); },
                error: (err) => { this.errMessage = err; }
            });
        } else {
            this.fashion.creation_date = new Date();
            this._service.postFashion(this.fashion).subscribe({
                next: () => { this.router.navigate(['/list']); },
                error: (err) => { this.errMessage = err; }
            });
        }
    }

    cancel() {
        this.router.navigate(['/list']);
    }
}
