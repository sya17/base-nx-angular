import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { 
  Table, 
  type TableColumn, 
  type TableConfig,
  Card, 
  Button, 
  TextField,
  FormField,
  Modal,
  Icon,
  Badge
} from '@base-nx-angular/shared/ui';

interface DataItem {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  startDate: string;
  status: 'active' | 'inactive' | 'pending';
}

@Component({
  selector: 'lib-data-management',
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    Table, 
    Card, 
    Button, 
    TextField, 
    FormField,
    Modal, 
    Icon,
    Badge
  ],
  templateUrl: './data-management.html',
  styleUrl: './data-management.scss',
})
export class DataManagement implements OnInit {
  // Table configuration
  columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, type: 'number', width: '80px' },
    { key: 'name', label: 'Full Name', sortable: true, type: 'text' },
    { key: 'email', label: 'Email', sortable: true, type: 'text' },
    { key: 'department', label: 'Department', sortable: true, type: 'text' },
    { key: 'position', label: 'Position', sortable: true, type: 'text' },
    { key: 'salary', label: 'Salary', sortable: true, type: 'number', align: 'right' },
    { key: 'startDate', label: 'Start Date', sortable: true, type: 'date' },
    { key: 'status', label: 'Status', sortable: true, type: 'custom' }
  ];

  tableConfig: TableConfig = {
    selectable: true,
    pagination: true,
    sorting: true,
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 50]
  };

  // Data and state
  data: DataItem[] = [];
  selectedRows: DataItem[] = [];
  isModalOpen = false;
  isEditMode = false;
  currentEditId: number | null = null;
  
  // Form
  dataForm: FormGroup;
  formErrors: { [key: string]: string } = {};

  // Statistics
  stats = {
    total: 0,
    active: 0,
    inactive: 0,
    pending: 0
  };

  constructor(private formBuilder: FormBuilder) {
    this.dataForm = this.createForm();
  }

  ngOnInit() {
    this.loadInitialData();
    this.updateStats();
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', [Validators.required]],
      position: ['', [Validators.required]],
      salary: ['', [Validators.required, Validators.min(0)]],
      startDate: ['', [Validators.required]],
      status: ['active', [Validators.required]]
    });
  }

  private loadInitialData() {
    this.data = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@company.com',
        department: 'Engineering',
        position: 'Senior Developer',
        salary: 85000,
        startDate: '2022-01-15',
        status: 'active'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@company.com',
        department: 'Marketing',
        position: 'Marketing Manager',
        salary: 75000,
        startDate: '2021-11-20',
        status: 'active'
      },
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.johnson@company.com',
        department: 'Engineering',
        position: 'Frontend Developer',
        salary: 70000,
        startDate: '2023-03-10',
        status: 'pending'
      },
      {
        id: 4,
        name: 'Sarah Wilson',
        email: 'sarah.wilson@company.com',
        department: 'HR',
        position: 'HR Specialist',
        salary: 60000,
        startDate: '2020-06-05',
        status: 'inactive'
      },
      {
        id: 5,
        name: 'David Brown',
        email: 'david.brown@company.com',
        department: 'Sales',
        position: 'Sales Representative',
        salary: 55000,
        startDate: '2023-08-12',
        status: 'active'
      },
      {
        id: 6,
        name: 'Emily Davis',
        email: 'emily.davis@company.com',
        department: 'Finance',
        position: 'Accountant',
        salary: 65000,
        startDate: '2022-04-01',
        status: 'active'
      },
      {
        id: 7,
        name: 'Kevin White',
        email: 'kevin.white@company.com',
        department: 'IT',
        position: 'Network Administrator',
        salary: 80000,
        startDate: '2021-07-15',
        status: 'active'
      },
      {
        id: 8,
        name: 'Lisa Taylor',
        email: 'lisa.taylor@company.com',
        department: 'Operations',
        position: 'Operations Manager',
        salary: 90000,
        startDate: '2020-03-01',
        status: 'active'
      },
      {
        id: 9,
        name: 'Michael Lee',
        email: 'michael.lee@company.com',
        department: 'Engineering',
        position: 'Backend Developer',
        salary: 75000,
        startDate: '2022-09-01',
        status: 'active'
      },
      {
        id: 10,
        name: 'Natalie Hall',
        email: 'natalie.hall@company.com',
        department: 'Marketing',
        position: 'Marketing Specialist',
        salary: 60000,
        startDate: '2021-05-01',
        status: 'active'
      },
      {
        id: 11,
        name: 'Olivia Martin',
        email: 'olivia.martin@company.com',
        department: 'HR',
        position: 'Recruiter',
        salary: 50000,
        startDate: '2023-01-01',
        status: 'pending'
      },
      {
        id: 12,
        name: 'Patrick Brooks',
        email: 'patrick.brooks@company.com',
        department: 'Sales',
        position: 'Sales Manager',
        salary: 100000,
        startDate: '2022-06-01',
        status: 'active'
      },
      {
        id: 13,
        name: 'Rachel Patel',
        email: 'rachel.patel@company.com',
        department: 'Finance',
        position: 'Financial Analyst',
        salary: 70000,
        startDate: '2021-02-01',
        status: 'active'
      },
      {
        id: 14,
        name: 'Samantha Jenkins',
        email: 'samantha.jenkins@company.com',
        department: 'IT',
        position: 'Software Engineer',
        salary: 85000,
        startDate: '2020-08-01',
        status: 'active'
      },
      {
        id: 15,
        name: 'Thomas Harris',
        email: 'thomas.harris@company.com',
        department: 'Operations',
        position: 'Supply Chain Manager',
        salary: 95000,
        startDate: '2022-10-01',
        status: 'active'
      },
      {
        id: 16,
        name: 'Victoria Brown',
        email: 'victoria.brown@company.com',
        department: 'Engineering',
        position: 'Quality Assurance Engineer',
        salary: 65000,
        startDate: '2021-03-01',
        status: 'active'
      },
      {
        id: 17,
        name: 'William Davis',
        email: 'william.davis@company.com',
        department: 'Marketing',
        position: 'Digital Marketing Specialist',
        salary: 55000,
        startDate: '2023-02-01',
        status: 'pending'
      },
      {
        id: 18,
        name: 'Xavier Martin',
        email: 'xavier.martin@company.com',
        department: 'HR',
        position: 'Training Specialist',
        salary: 50000,
        startDate: '2022-05-01',
        status: 'active'
      },
      {
        id: 19,
        name: 'Yvonne Lee',
        email: 'yvonne.lee@company.com',
        department: 'Sales',
        position: 'Account Manager',
        salary: 70000,
        startDate: '2021-01-01',
        status: 'active'
      },
      {
        id: 20,
        name: 'Zoe Taylor',
        email: 'zoe.taylor@company.com',
        department: 'Finance',
        position: 'Financial Manager',
        salary: 100000,
        startDate: '2020-09-01',
        status: 'active'
      }
    ];
  }

  private updateStats() {
    this.stats.total = this.data.length;
    this.stats.active = this.data.filter(item => item.status === 'active').length;
    this.stats.inactive = this.data.filter(item => item.status === 'inactive').length;
    this.stats.pending = this.data.filter(item => item.status === 'pending').length;
  }

  // Table event handlers
  onRowClick(row: DataItem) {
    console.log('Row clicked:', row);
  }

  onSelectionChange(selectedRows: DataItem[]) {
    this.selectedRows = selectedRows;
  }

  onSortChange(sortInfo: {column: string, direction: 'asc' | 'desc'}) {
    console.log('Sort changed:', sortInfo);
  }

  onPageChange(pageInfo: {page: number, pageSize: number}) {
    console.log('Page changed:', pageInfo);
  }

  // Modal and form handlers
  openAddModal() {
    this.isEditMode = false;
    this.currentEditId = null;
    this.dataForm.reset({ status: 'active' });
    this.formErrors = {};
    this.isModalOpen = true;
  }

  openEditModal(item: DataItem) {
    this.isEditMode = true;
    this.currentEditId = item.id;
    this.dataForm.patchValue(item);
    this.formErrors = {};
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.dataForm.reset();
    this.formErrors = {};
  }

  onSubmit() {
    if (this.dataForm.valid) {
      const formData = this.dataForm.value;
      
      if (this.isEditMode && this.currentEditId) {
        // Edit existing item
        const index = this.data.findIndex(item => item.id === this.currentEditId);
        if (index > -1) {
          this.data[index] = { ...this.data[index], ...formData };
        }
      } else {
        // Add new item
        const newId = Math.max(...this.data.map(item => item.id)) + 1;
        this.data.push({ id: newId, ...formData });
      }
      
      this.updateStats();
      this.closeModal();
      
      // Show success message
      this.showToast(
        this.isEditMode ? 'Data updated successfully!' : 'Data added successfully!',
        'success'
      );
    } else {
      this.validateForm();
    }
  }

  private validateForm() {
    this.formErrors = {};
    Object.keys(this.dataForm.controls).forEach(key => {
      const control = this.dataForm.get(key);
      if (control && control.invalid && control.touched) {
        this.formErrors[key] = this.getErrorMessage(key, control.errors);
      }
    });
  }

  private getErrorMessage(fieldName: string, errors: any): string {
    if (errors?.['required']) return `${this.getFieldLabel(fieldName)} is required`;
    if (errors?.['email']) return 'Please enter a valid email address';
    if (errors?.['minlength']) return `${this.getFieldLabel(fieldName)} must be at least ${errors.minlength.requiredLength} characters`;
    if (errors?.['min']) return `${this.getFieldLabel(fieldName)} must be greater than 0`;
    return 'Invalid input';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      name: 'Name',
      email: 'Email',
      department: 'Department',
      position: 'Position',
      salary: 'Salary',
      startDate: 'Start Date',
      status: 'Status'
    };
    return labels[fieldName] || fieldName;
  }

  // Bulk actions
  deleteSelected() {
    if (this.selectedRows.length > 0) {
      const selectedIds = this.selectedRows.map(row => row.id);
      this.data = this.data.filter(item => !selectedIds.includes(item.id));
      this.selectedRows = [];
      this.updateStats();
      this.showToast(`${selectedIds.length} item(s) deleted successfully!`, 'success');
    }
  }

  deleteItem(item: DataItem) {
    const index = this.data.findIndex(d => d.id === item.id);
    if (index > -1) {
      this.data.splice(index, 1);
      this.updateStats();
      this.showToast('Item deleted successfully!', 'success');
    }
  }

  // Utility methods
  getStatusColor(status: string): 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'secondary' {
    switch (status) {
      case 'active': return 'success';
      case 'pending': return 'warning';
      case 'inactive': return 'danger';
      default: return 'secondary';
    }
  }

  formatSalary(salary: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(salary);
  }

  private showToast(message: string, type: 'success' | 'error' | 'warning' | 'info') {
    // Toast implementation would go here
    console.log(`${type.toUpperCase()}: ${message}`);
  }

  // Export functionality
  exportData() {
    const csvContent = this.convertToCSV(this.data);
    this.downloadCSV(csvContent, 'employee-data.csv');
    this.showToast('Data exported successfully!', 'success');
  }

  private convertToCSV(data: DataItem[]): string {
    const headers = ['ID', 'Name', 'Email', 'Department', 'Position', 'Salary', 'Start Date', 'Status'];
    const rows = data.map(item => [
      item.id,
      item.name,
      item.email,
      item.department,
      item.position,
      item.salary,
      item.startDate,
      item.status
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  private downloadCSV(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}