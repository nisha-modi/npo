import { Component, OnInit } from '@angular/core';
import { FileHandle } from '../dragDrop.directive';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent implements OnInit {

  files: FileHandle[] = [];

  filesDropped(files: FileHandle[]): void {
    this.files = files;
  }

  upload(): void {
    alert(this.files[0].text);
  }

  constructor() { }

  ngOnInit() {
  }

}
