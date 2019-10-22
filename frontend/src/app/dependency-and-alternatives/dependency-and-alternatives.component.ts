import { Component, OnInit, Input } from "@angular/core";

class Dependency {
  name: string;
  treeScore: number;
}

@Component({
  selector: "app-dependency-and-alternatives",
  templateUrl: "./dependency-and-alternatives.component.html",
  styleUrls: ["./dependency-and-alternatives.component.scss"]
})
export class DependencyAndAlternativesComponent implements OnInit {
  @Input() dependency: Dependency;
  @Input() alternatives: Dependency[];

  constructor() {}

  ngOnInit() {}
}
