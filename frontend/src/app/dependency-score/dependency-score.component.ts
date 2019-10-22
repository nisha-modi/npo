import { Component, OnInit, Input } from "@angular/core";
import { Dependency } from "../dependency-and-alternatives/dependency-and-alternatives.component";

@Component({
  selector: "app-dependency-score",
  templateUrl: "./dependency-score.component.html",
  styleUrls: ["./dependency-score.component.scss"]
})
export class DependencyScoreComponent implements OnInit {
  @Input() dependency: Dependency;

  constructor() {}

  name = this.dependency.name;
  treeScore = this.dependency.treeScore;

  ngOnInit() {}
}
