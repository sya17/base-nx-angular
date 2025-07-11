import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Layout } from '@base-nx-angular/layout';

@Component({
  imports: [RouterModule, Layout],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'base-nx-angular';
}
