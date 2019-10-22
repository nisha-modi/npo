import { Component, OnInit, Input } from "@angular/core";
import { DependencyAndAlternativesComponent } from "../dependency-and-alternatives/dependency-and-alternatives.component";

@Component({
  selector: "app-dependency-score",
  templateUrl: "./dependency-score.component.html",
  styleUrls: ["./dependency-score.component.scss"]
})
export class DependencyScoreComponent implements OnInit {
  @Input() dependency: Dependency;

  constructor() {}

  name = Dependency.name();
  treeScore = Dependency.treeScore();

  ngOnInit() {}
}
