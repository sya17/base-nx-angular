import { Component } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { Layout } from '@base-nx-angular/layout';
import { CommonModule } from '@angular/common';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  imports: [RouterModule, Layout, CommonModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'base-nx-angular';
  private currentRoute = '';
  
  // Observable untuk deteksi auth route
  isAuthRoute$: Observable<boolean>;

  constructor(private router: Router) {
    // Initialize Observable after router is available
    this.isAuthRoute$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => {
        const authRoutes = ['/login', '/register', '/forgot-password'];
        return authRoutes.some(route => event.url.startsWith(route));
      })
    );

    // Track current route
    this.currentRoute = this.router.url;
    
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }

  isAuthRoute(): boolean {
    const authRoutes = ['/login', '/register', '/forgot-password'];
    const currentUrl = this.router.url;
    return authRoutes.some(route => currentUrl.startsWith(route));
  }
}