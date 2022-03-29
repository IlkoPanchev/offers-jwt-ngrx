import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  errorMessage: string;
  errorStatus: number | undefined;

  constructor(activatedRoute: ActivatedRoute, private router: Router) {
    this.errorMessage = activatedRoute.snapshot.queryParams['error'];
    this.errorStatus = activatedRoute.snapshot.queryParams['status'];
  }

  goToMainPage(): void {
    this.router.navigate(['/']);
  }

}
