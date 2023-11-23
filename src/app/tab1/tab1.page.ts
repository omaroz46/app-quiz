import { Router } from '@angular/router';
import { Component, NgZone } from '@angular/core';
import { IonicModule, Platform, AlertController } from '@ionic/angular';
import { ShareComponent } from '../share/share.component';
import { FormsModule } from '@angular/forms';
import { QuestionComponent } from '../question/question.component';
import { LocalNotifications } from '@capacitor/local-notifications';
import { CommonModule } from '@angular/common';
import { createClient } from '@supabase/supabase-js';
import { arrowBack } from 'ionicons/icons';
import { addIcons } from 'ionicons';


const supabaseUrl = 'https://zpwwcwsovasrrdplkpsh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpwd3djd3NvdmFzcnJkcGxrcHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAyMDk4MTUsImV4cCI6MjAxNTc4NTgxNX0.LKPE-MWY8POB5JrbGl9Gvfi01Rh9nvA7jgBmIH3bSKs';

const supabase = createClient(supabaseUrl, supabaseKey);

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ShareComponent, FormsModule, QuestionComponent, CommonModule],
})
export class Tab1Page {
  answerClass: string = '';
  currentQuestionIndex: number = 0;
  allQuestionsAnswered: boolean = false;
  answerClassArray: string[] = [];

  constructor(
    private platform: Platform,
    private router: Router,
    private alertController: AlertController,
    private zone: NgZone
  ) {
    addIcons( {arrowBack} )
    if (this.platform.is('capacitor')) {
      this.initializeLocalNotifications();
    }
    this.promptForUsername();
  }

  initializeLocalNotifications() {
    LocalNotifications.requestPermissions().then((result) => {
      if (result) {
        console.log('Local notifications permission granted');
  
        LocalNotifications.addListener('localNotificationReceived', (notification) => {
          console.log('Local Notification received:', notification);
        });
      }
    });
  }
  

  async promptForUsername() {
    const alert = await this.alertController.create({
      header: 'Enter Your Username',
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: 'Username',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('User canceled');
          },
        },
        {
          text: 'Save',
          handler: (data) => {
            console.log('Username entered:', data.username);
            this.saveUsername(data.username);
          },
        },
      ],
    });

    await alert.present();
  }

  async saveUsername(username: string) {
    const { data, error } = await supabase
      .from('user')
      .upsert(
        [{ user_name: username }],
        { onConflict: ['user_name'] } as any // Hier wird der Typ explizit als 'any' festgelegt
      );
  
    if (error) {
      console.error('Error saving username:', error.message);
    } else {
      console.log('Username saved successfully:', data);
    }
  }  

  handleAnswer(answer: string) {
    let isCorrect = false;

    switch (this.currentQuestionIndex) {
      case 0:
        isCorrect = answer === 'Paris';
        break;
      case 1:
        isCorrect = answer === '7';
        break;
      case 2:
        isCorrect = answer === 'Switzerland';
        break;
      case 3:
        isCorrect = answer === '1865';
        break;
      case 4:
        isCorrect = answer === 'China';
        break;
      case 5:
        isCorrect = answer === 'Orange';
        break;
      default:
        console.log('Ungültiger Index für Frage');
        break;
    }

    this.sendLocalNotification(isCorrect, answer);

    this.answerClassArray.push(isCorrect ? 'success-answer' : 'danger-answer');

    if (this.currentQuestionIndex === 5) {
      this.allQuestionsAnswered = true;
    }

    this.currentQuestionIndex++;
  }

  sendLocalNotification(isCorrect: boolean, answer: string) {
    const title = 'Quiz Notification';
    const message = isCorrect ? 'Correct answer!' : 'Wrong answer.';
    const color = isCorrect ? 'green' : 'red';

    LocalNotifications.schedule({
      notifications: [
        {
          title: title,
          body: message,
          id: 1,
          schedule: { at: new Date(Date.now() + 1) },
          actionTypeId: '',
          extra: { color: color },
        },
      ],
    });
  }

  async updateScore(score: number) {
    const { data, error } = await supabase
      .from('user')
      .update({ score })
      .match({ user_name: 'username' });

    if (error) {
      console.error('Error updating score:', error.message);
    } else {
      console.log('Score updated successfully:', data);
    }
  }

  calculateCorrectAnswers(): number {
    return this.answerClassArray.filter((answerClass) => answerClass === 'success-answer').length;
  }

  navigateToTab2() {
    this.router.navigate(['tabs/tab2']);
  }

  resetQuiz() {
    this.currentQuestionIndex = 0;
    this.allQuestionsAnswered = false;
    this.answerClassArray = [];
  }
}
