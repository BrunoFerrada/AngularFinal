import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tool-bar',
  standalone: false,
  
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.scss'
})
export class ToolBarComponent {

  @Output() drawerToggle = new EventEmitter();
}
