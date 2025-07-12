import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Badge,
  Button,
  Card,
  NotificationBadge,
  Datepicker,
  Dropdown,
  DropdownOption,
  TextField,
  Modal,
  Progress,
  Slider,
  Switch,
  Tabs,
  Tab,
  Toast,
} from '@base-nx-angular/shared/ui';

@Component({
  selector: 'lib-layout',
  imports: [
    CommonModule,
    Button,
    Badge,
    NotificationBadge,
    Card,
    Datepicker,
    Dropdown,
    TextField,
    Modal,
    Progress,
    Slider,
    Switch,
    Tabs,
    Tab,
    Toast,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  @ViewChild('toastContainer') toastContainer!: Toast;

  activeTab = 'tab1';
  isLoading = false;
  notification: string | null = null;
  isModalOpen = false;
  modalSize: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';
  modalTitle = '';

  downloadProgress = 45;

  countryOptions: DropdownOption[] = [
    { value: 'id', label: 'Indonesia', icon: 'flag-id' },
    { value: 'us', label: 'United States', icon: 'flag-us' },
    { value: 'sg', label: 'Singapore', icon: 'flag-sg' },
    { value: 'my', label: 'Malaysia', icon: 'flag-my' },
    { value: 'th', label: 'Thailand', icon: 'flag-th' },
    { value: 'ph', label: 'Philippines', icon: 'flag-ph' },
    { value: 'vn', label: 'Vietnam', icon: 'flag-vn' },
  ];

  showNotification(message: string): void {
    this.notification = message;
    setTimeout(() => {
      this.notification = null;
    }, 3000);
  }

  openModal(size: 'sm' | 'md' | 'lg' | 'xl' | 'full'): void {
    this.modalSize = size;
    this.modalTitle = `${size.toUpperCase()} Modal Demo`;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.showNotification('Modal closed');
  }
  onTabChange(tabId: string): void {
    this.activeTab = tabId;
    console.log('Active tab changed to:', tabId);
  }

  showSuccessToast(): void {
    this.toastContainer.success(
      'Success!',
      'Your action has been completed successfully.',
      { duration: 4000 }
    );
  }

  showErrorToast(): void {
    this.toastContainer.error(
      'Error Occurred',
      'Something went wrong. Please try again.',
      {
        duration: 6000,
        action: {
          label: 'Retry',
          handler: () => console.log('Retry action'),
        },
      }
    );
  }

  showWarningToast(): void {
    this.toastContainer.warning(
      'Warning',
      'Please check your input data before proceeding.'
    );
  }

  showInfoToast(): void {
    this.toastContainer.info(
      'Information',
      'Your data has been automatically saved.',
      { persistent: true }
    );
  }
}
