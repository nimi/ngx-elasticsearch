import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'example-hits-list-item',
  templateUrl: './hits-list-item.component.html',
  styleUrls: ['./hits-list-item.component.css']
})
export class HitsListItemComponent implements OnInit {
  @Input()
  public set hit(val: any) { this.result = val._source; };
  public get hit() { return this.result; }

  public result: any = {};

  constructor() { }

  ngOnInit() {
    console.log(this.hit);
  }

}
