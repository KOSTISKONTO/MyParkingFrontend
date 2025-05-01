import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
  @ViewChild('autocompleteContainer') autocompleteContainer!: ElementRef;

  searchControl = new FormControl('');
  suggestions: any[] = [];
  selectedResult: any = null;
  cities: any = null;
  neighbor: any = null;

  constructor(private http: HttpClient, private eRef: ElementRef, private route:Router) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        filter((value): value is string => !!value && value.length > 2),
        switchMap((value) =>
          this.http.get<any>('http://localhost:8080/parking/location', {
            params: { q: value }
          })
        )
      )
      .subscribe({
        next: (res: any) => {
          console.log('✅ google api:', res.Description,  'cities: ', res.Cities, 'neighboor: ', res.Neighborhood);
          this.suggestions = res.Description;
          this.cities = res.Cities;
          this.neighbor=res.Neighborhood;
        },
        error: (err) => {
          console.error('❌ Error fetching Google results', err);
        }
      });
  }

  selectSuggestion(item: any) {
    this.selectedResult = item;
    this.searchControl.setValue(item.formatted, { emitEvent: false });
    this.suggestions = []; // Εξαφανίζει τις επιλογές μετά την επιλογή
    this.route.navigate(['/bookingbysearch/'+item])
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.suggestions = [];
    }
  }
}
