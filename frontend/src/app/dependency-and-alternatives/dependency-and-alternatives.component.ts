import { Component, OnInit, Input } from '@angular/core';
import { Dependency } from '../models/dependency.model';

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
  @Input() dependency: Dependency;

  constructor() {}

  ngOnInit() {}
}
