import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DependencyScoreComponent } from './dependency-score/dependency-score.component';
import { DependencyAndAlternativesComponent } from './dependency-and-alternatives/dependency-and-alternatives.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { AnalyzeComponent } from './analyze/analyze.component';
import { DragDirective } from './dragDrop.directive';
import { NpoNameComponent } from './npo-name/npo-name.component';

@NgModule({
  declarations: [
    AppComponent,
    DependencyScoreComponent,
    DependencyAndAlternativesComponent,
    EmptyStateComponent,
    AnalyzeComponent,
    DragDirective,
    NpoNameComponent
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
