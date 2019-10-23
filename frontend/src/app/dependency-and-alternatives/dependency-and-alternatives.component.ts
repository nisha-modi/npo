import { Component, OnInit, Input } from '@angular/core';

export class DependencyTest {
  name: 'name';
  treeScore: '54%';
}

@Component({
  selector: 'app-dependency-and-alternatives',
  templateUrl: './dependency-and-alternatives.component.html',
  styleUrls: ['./dependency-and-alternatives.component.scss']
})
export class DependencyAndAlternativesComponent implements OnInit {
  @Input() dependency: DependencyTest;
  @Input() alternatives: DependencyTest[];

  constructor() {}

  ngOnInit() {}
}
