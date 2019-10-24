import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FileHandle } from '../dragDrop.directive';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent implements OnInit {
  @Output() dependenciesFound = new EventEmitter<Map<string, string>>();

  files: FileHandle[] = [];

  filesDropped(files: FileHandle[]): void {
    this.files = files;

    const data = JSON.parse(this.files[0].text);

    if (data.dependencies) {
      this.dependenciesFound.emit(data.dependencies);
    } else {
      throw new Error('No dependencies found. What do?');
    }
  }

  upload(): void {
    alert(this.files[0].text);
  }

  constructor() {}

  ngOnInit() {}
}
