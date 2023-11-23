// C:\M335\thequizzler\app-quiz\src\app\share\share.component.ts

import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ShareComponent {
  constructor() {}

@Input() shareText = ''

  shareLink() {
    Share.share({
      title: 'The Quizzler',
      text: this.shareText,
      url: '',
      dialogTitle: 'Teilen'
    })
    //his.socialSharing.share(this.shareText, '', '');
    //console.log('Teilen im Browser:', link);
  }
}
