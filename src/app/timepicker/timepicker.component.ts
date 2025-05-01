import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimepickerComponent implements OnInit {
  selectedTime: string = '';
  timeSlots: string[] = [];
  filteredTimeSlots: string[] = [];

  ngOnInit(): void {
    this.generateTimeSlotsFromNow();
    this.setDefaultTime();
  }

  generateTimeSlotsFromNow() {
    const fullDay: string[] = [];
    for (let h = 0; h < 24; h++) {
      fullDay.push(`${this.pad(h)}:00`);
      fullDay.push(`${this.pad(h)}:30`);
    }

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const startIndex = fullDay.findIndex(slot => {
      const [h, m] = slot.split(':').map(Number);
      return (h > currentHour || (h === currentHour && m >= (currentMinute < 30 ? 0 : 30)));
    });

    const rotated = [...fullDay.slice(startIndex), ...fullDay.slice(0, startIndex)];

    this.timeSlots = rotated;
    this.filteredTimeSlots = [...rotated];
  }

  setDefaultTime() {
    const now = new Date();
    const h = this.pad(now.getHours());
    const m = now.getMinutes() < 30 ? '00' : '30';
    this.selectedTime = `${h}:${m}`;
  }

  pad(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }

  onBlur() {
    if (!this.timeSlots.includes(this.selectedTime)) {
      this.setDefaultTime();
    }
  }


}
