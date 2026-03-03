import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    username: string = '';
    password: string = '';
    loginFailed: boolean = false;
    isLoading: boolean = false;

    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit() {
        // Đọc cookie đã lưu từ server, tự động điền vào ô input
        this.http.get<any>('/user-login-cookie').subscribe({
            next: (data) => {
                if (data.username) this.username = data.username;
                if (data.password) this.password = data.password;
            },
            error: () => { }
        });
    }

    onLogin() {
        this.isLoading = true;
        this.loginFailed = false;

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.http.post<any>('/user-login', { username: this.username, password: this.password }, { headers }).subscribe({
            next: (res) => {
                this.isLoading = false;
                if (res.success) {
                    this.router.navigate(['/']);
                } else {
                    this.loginFailed = true;
                }
            },
            error: (err) => {
                this.isLoading = false;
                this.loginFailed = true;
            }
        });
    }
}
