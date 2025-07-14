import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Icon, Card, Button, Switch, TextField } from '@base-nx-angular/shared/ui';

@Component({
  selector: 'lib-settings',
  imports: [CommonModule, FormsModule, Icon, Card, Button, Switch, TextField],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  protected activeTab = 'general';

  protected generalSettings = {
    companyName: 'Acme Corporation',
    companyEmail: 'admin@acme.com',
    timezone: 'UTC-8',
    language: 'English',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD'
  };

  protected securitySettings = {
    twoFactorAuth: true,
    passwordExpiry: false,
    sessionTimeout: true,
    ipWhitelist: false,
    auditLogging: true,
    encryptionEnabled: true
  };

  protected notificationSettings = {
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    projectUpdates: true,
    teamMentions: true,
    systemAlerts: true,
    marketingEmails: false
  };

  protected integrationSettings = [
    {
      name: 'Slack',
      description: 'Team communication and notifications',
      icon: 'chat',
      connected: true,
      status: 'active'
    },
    {
      name: 'GitHub',
      description: 'Code repository and version control',
      icon: 'code',
      connected: true,
      status: 'active'
    },
    {
      name: 'Google Drive',
      description: 'File storage and document sharing',
      icon: 'folder',
      connected: false,
      status: 'inactive'
    },
    {
      name: 'Jira',
      description: 'Project management and issue tracking',
      icon: 'bug_report',
      connected: true,
      status: 'active'
    },
    {
      name: 'Zoom',
      description: 'Video conferencing and meetings',
      icon: 'videocam',
      connected: false,
      status: 'inactive'
    }
  ];

  protected billingInfo = {
    plan: 'Professional',
    price: '$29/month',
    nextBilling: '2024-08-15',
    paymentMethod: '**** **** **** 4532',
    billingEmail: 'billing@acme.com'
  };

  protected tabs = [
    { id: 'general', label: 'General', icon: 'tune' },
    { id: 'security', label: 'Security', icon: 'shield' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
    { id: 'integrations', label: 'Integrations', icon: 'extension' },
    { id: 'billing', label: 'Billing', icon: 'payment' }
  ];

  protected setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }

  protected onGeneralSettingChange(field: string, value: any) {
    (this.generalSettings as any)[field] = value;
    console.log(`General setting changed: ${field} = ${value}`);
  }

  protected onSecuritySettingChange(field: string, value: boolean) {
    (this.securitySettings as any)[field] = value;
    console.log(`Security setting changed: ${field} = ${value}`);
  }

  protected onNotificationSettingChange(field: string, value: boolean) {
    (this.notificationSettings as any)[field] = value;
    console.log(`Notification setting changed: ${field} = ${value}`);
  }

  protected toggleIntegration(integration: any) {
    integration.connected = !integration.connected;
    integration.status = integration.connected ? 'active' : 'inactive';
    console.log(`Integration ${integration.name} ${integration.connected ? 'connected' : 'disconnected'}`);
  }

  protected saveSettings() {
    console.log('Settings saved successfully');
    // Here you would typically call an API to save the settings
  }

  protected resetSettings() {
    console.log('Settings reset to defaults');
    // Here you would reset all settings to their default values
  }

  protected exportSettings() {
    console.log('Exporting settings...');
    // Here you would export the current settings
  }

  protected importSettings() {
    console.log('Importing settings...');
    // Here you would import settings from a file
  }
}