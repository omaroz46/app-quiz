import { CommonModule } from '@angular/common';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // Fügen Sie diese Zeile hinzu

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  imports: [IonicModule, CommonModule], // Fügen Sie diese Zeile hinzu
  standalone: true
})
export class QuestionComponent {
  @Input() question: string | undefined;
  @Input() options: string[] | undefined;
  @Output() answerSelected = new EventEmitter<string>();

  constructor() {}

  selectAnswer(answer: string) {
    this.answerSelected.emit(answer);
  }
}
