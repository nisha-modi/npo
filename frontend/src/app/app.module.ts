import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DependencyScoreComponent } from './dependency-score/dependency-score.component';
import { DependencyAndAlternativesComponent } from './dependency-and-alternatives/dependency-and-alternatives.component';
import { DepTreeTempComponent } from './dep-tree-temp/dep-tree-temp.component';

@NgModule({
  declarations: [
    AppComponent,
    DependencyScoreComponent,
    DependencyAndAlternativesComponent,
    DepTreeTempComponent
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
