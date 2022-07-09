import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-back-menu',
  templateUrl: './back-menu.component.html',
  styleUrls: ['./back-menu.component.scss']
})
export class BackMenuComponent implements OnInit {

  @Output() public click = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  backToMain() : void {
    this.click.emit();
  }

}
