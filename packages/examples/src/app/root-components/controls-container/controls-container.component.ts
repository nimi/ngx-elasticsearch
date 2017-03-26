import { Component, OnInit } from '@angular/core';
import { ControlManagerService } from '../../shared/services/control-manager.service';
import { manager } from '../../shared/services/control-utils';

@Component({
  selector: 'example-controls-container',
  templateUrl: './controls-container.component.html',
  styleUrls: ['./controls-container.component.css']
})
export class ControlsContainerComponent implements OnInit {
  manager: ControlManagerService = manager;
  controls: any;

  ngOnInit() {
    this.controls = this.manager.controlStoreMap;
    console.log(this.manager, this.controls);
  }

  changeValue(event: any) {
    this.manager.channel.emit({ placeholder: 'foo' });
  }

}
