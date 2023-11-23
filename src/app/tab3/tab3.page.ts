// C:\M335\thequizzler\app-quiz\src\app\tab3\tab3.page.ts

import { Component } from '@angular/core';
import { ShareComponent } from '../share/share.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BatteryStatusComponent } from '../battery-status/battery-status.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ShareComponent, BatteryStatusComponent],
})
export class Tab3Page {
  constructor() {}


}
