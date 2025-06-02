import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent {
  today: Date = new Date(); // ⏰ σήμερα
  selectedDate: Date = new Date();
  submit() {
  }
      // ✨ επιλεγμένη ημερομηνία

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 γιατί μήνες = 0-11
    const day = String(date.getDate()).padStart(2, '0');
      
    return `${year}-${month}-${day}`;
  }
}
