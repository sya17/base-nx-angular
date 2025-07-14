import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'lib-settings',
  imports: [CommonModule, MatIconModule, MatCardModule, MatTabsModule, MatSlideToggleModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  protected activeTab = 'general';

  protected generalSettings = {
    siteName: 'Base NX Angular',
    siteDescription: 'Modern Angular application with NX workspace',
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY'
  };

  protected notificationSettings = {
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    weeklyReports: true,
    marketingEmails: false
  };

  protected securitySettings = {
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5
  };

  protected integrations = [
    { name: 'Slack', description: 'Team communication', connected: true },
    { name: 'GitHub', description: 'Code repository', connected: true },
    { name: 'Google Analytics', description: 'Website analytics', connected: false },
    { name: 'Stripe', description: 'Payment processing', connected: false }
  ];

  protected notificationSettingsArray = [
    {key: 'emailNotifications' as keyof typeof this.notificationSettings, label: 'Email Notifications', desc: 'Receive notifications via email'},
    {key: 'pushNotifications' as keyof typeof this.notificationSettings, label: 'Push Notifications', desc: 'Receive browser push notifications'},
    {key: 'smsNotifications' as keyof typeof this.notificationSettings, label: 'SMS Notifications', desc: 'Receive notifications via SMS'},
    {key: 'weeklyReports' as keyof typeof this.notificationSettings, label: 'Weekly Reports', desc: 'Get weekly summary reports'},
    {key: 'marketingEmails' as keyof typeof this.notificationSettings, label: 'Marketing Emails', desc: 'Receive promotional emails'}
  ];

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  toggleNotification(setting: keyof typeof this.notificationSettings): void {
    this.notificationSettings[setting] = !this.notificationSettings[setting];
  }

  toggleSecurity(setting: keyof typeof this.securitySettings): void {
    if (typeof this.securitySettings[setting] === 'boolean') {
      (this.securitySettings[setting] as boolean) = !(this.securitySettings[setting] as boolean);
    }
  }

  toggleIntegration(integration: any): void {
    integration.connected = !integration.connected;
  }
}