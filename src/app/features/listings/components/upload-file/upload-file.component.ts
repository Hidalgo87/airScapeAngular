import { Component, Output } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { HttpClientModule } from '@angular/common/http';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { heroArrowDownTray, heroTrash } from '@ng-icons/heroicons/outline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { EventEmitter } from 'stream';
import { ListingParams } from '../../interfaces/listingParams.interface';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  standalone: true,
  imports: [
    FileUploadModule,
    ButtonModule,
    BadgeModule,
    ProgressBarModule,
    ToastModule,
    HttpClientModule,
    CommonModule,
    NgIconComponent,
  ],
  providers: [MessageService, provideIcons({ heroArrowDownTray, heroTrash })],
})
export class UploadFileComponent {
  files: File[] = [];

  constructor(
    private config: PrimeNGConfig,
    private messageService: MessageService
  ) {}

  choose(event: Event, callback: () => void) {
    callback();
  }

  // removeFile(i: number) {
  //   this.files.splice(i, 1);
  //   console.log(this.files);
  // }

  onRemoveTemplatingFile(
    event: Event,
    file: any,
    removeFileCallback: (event: Event, index: number) => void,
    index: number
  ) {
    removeFileCallback(event, index);
    // this.totalSize -= parseInt(this.formatSize(file.size));
    // this.totalSizePercent = this.totalSize / 10;
  }

  // onClearTemplatingUpload(clear: () => void) {
  //   clear();
  //   this.totalSize = 0;
  //   this.totalSizePercent = 0;
  // }

  // onTemplatedUpload() {
  //   this.messageService.add({
  //     severity: 'info',
  //     summary: 'Success',
  //     detail: 'File Uploaded',
  //     life: 3000,
  //   });
  // }

  onSelectedFiles(event: { currentFiles: any[] }) {
    this.files = event.currentFiles;
    // this.files.forEach((file) => {
    //   this.totalSize += parseInt(this.formatSize(file.size));
    // });
    // this.totalSizePercent = this.totalSize / 10;
  }

  uploadEvent(callback: () => void) {
    callback();
  }

  // formatSize(bytes: number): string {
  //   const k = 1024;
  //   const dm = 3;
  //   const sizes: string[] = this.config.translation.fileSizeTypes ?? [];
  //   if (bytes === 0) {
  //     return `0 ${sizes[0]}`;
  //   }

  //   const i = Math.floor(Math.log(bytes) / Math.log(k));
  //   const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  //   return `${formattedSize} ${sizes[i]}`;
  // }
}
