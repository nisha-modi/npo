import {
    Directive,
    HostBinding,
    HostListener,
    Output,
    EventEmitter
  } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export interface FileHandle {
    text: string;
    // file: File;
    url: SafeUrl;
  }

@Directive({
    selector: '[appDrag]'
  })
  export class DragDirective {
    @Output() files: EventEmitter<FileHandle[]> = new EventEmitter();

    @HostBinding('style.background') private background = '#eee';

    constructor(private sanitizer: DomSanitizer) { }

    @HostListener('dragover', ['$event']) public onDragOver(evt: DragEvent) {
      evt.preventDefault();
      evt.stopPropagation();
      this.background = '#999';
    }

    @HostListener('dragleave', ['$event']) public onDragLeave(evt: DragEvent) {
      evt.preventDefault();
      evt.stopPropagation();
      this.background = '#eee';
    }

    @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
      evt.preventDefault();
      evt.stopPropagation();
      this.background = '#eee';

      const files: FileHandle[] = [];
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < evt.dataTransfer.files.length; i++) {
        const file = evt.dataTransfer.files[i];
        let text = null;
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
          text = fileReader.result;
          const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
          files.push({ text, url });
          if (files.length > 0) {
            this.files.emit(files);
          }
        };
        fileReader.readAsText(file);
      }
    }
  }
