import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-npo-name',
  templateUrl: './npo-name.component.html',
  styleUrls: ['./npo-name.component.scss']
})
export class NpoNameComponent implements OnInit {
  names$ = timer(0, 5000).pipe(
    map(value => {
      const words = [
        'Neon Panda Organization',
        'Nuclear Potato Ostriches',
        'No Popsicles, Okay?',
        'Nonsensical Party Orchestra',
        'Natural Pleasant One',
        'North Pole Olives',
        'Nasty Pancake Owls'
      ];

      return words[value % words.length];
    })
  );

  constructor() {}

  ngOnInit() {}
}
