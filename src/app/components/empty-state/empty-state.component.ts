import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent implements OnInit {

  error: any;

  constructor(
    private readonly location: Location,

  ) {  }

  ngOnInit(): void {

  }

  public back() {
    this.location.back();
  }

}
