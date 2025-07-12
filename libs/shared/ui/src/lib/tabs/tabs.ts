import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  AfterContentInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tab } from '../tab/tab';
export interface TabData {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  badge?: string | number;
}

export type TabsVariant = 'default' | 'pills' | 'underline' | 'cards';
export type TabsSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'lib-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
})
export class Tabs implements AfterContentInit, OnDestroy {
  @Input() variant: TabsVariant = 'default';
  @Input() size: TabsSize = 'md';
  @Input() activeTabId?: string;
  @Input() fullWidth = false;

  @Output() tabChange = new EventEmitter<string>();

  @ContentChildren(Tab) tabComponents!: QueryList<Tab>;

  tabs: TabData[] = [];
  indicatorLeft = 0;
  indicatorWidth = 0;

  private resizeObserver?: ResizeObserver;

  ngAfterContentInit(): void {
    this.initializeTabs();
    this.setupResizeObserver();

    // Listen for tab changes
    this.tabComponents.changes.subscribe(() => {
      this.initializeTabs();
    });
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  get containerClasses(): string {
    return 'tabs';
  }

  get navClasses(): string {
    let classes = ['tabs__nav', `tabs__nav--${this.variant}`];

    if (this.fullWidth) {
      classes.push('tabs__nav--full-width');
    }

    return classes.join(' ');
  }

  get contentClasses(): string {
    return `tabs__content tabs__content--${this.variant}`;
  }

  get badgeClasses(): string {
    return `tabs__badge tabs__badge--${this.size}`;
  }

  private initializeTabs(): void {
    this.tabs = this.tabComponents.map((tab) => ({
      id: tab.id,
      label: tab.label,
      icon: tab.icon,
      disabled: tab.disabled,
      badge: tab.badge,
    }));

    // Set active tab
    if (!this.activeTabId && this.tabs.length > 0) {
      const firstEnabledTab = this.tabs.find((tab) => !tab.disabled);
      if (firstEnabledTab) {
        this.activeTabId = firstEnabledTab.id;
      }
    }

    this.updateTabStates();

    // Update indicator position after view init
    setTimeout(() => this.updateIndicator(), 0);
  }

  private setupResizeObserver(): void {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateIndicator();
      });

      // Observe the container
      const container = document.querySelector('.tabs__nav');
      if (container) {
        this.resizeObserver.observe(container);
      }
    }
  }

  selectTab(tabId: string): void {
    const tab = this.tabs.find((t) => t.id === tabId);
    if (tab?.disabled) return;

    this.activeTabId = tabId;
    this.updateTabStates();
    this.updateIndicator();
    this.tabChange.emit(tabId);
  }

  private updateTabStates(): void {
    this.tabComponents.forEach((tab) => {
      tab.active = tab.id === this.activeTabId;
    });
  }

  private updateIndicator(): void {
    if (this.variant !== 'underline') return;

    const activeButton = document.querySelector(
      `#tab-${this.activeTabId}`
    ) as HTMLElement;
    if (activeButton) {
      this.indicatorLeft = activeButton.offsetLeft;
      this.indicatorWidth = activeButton.offsetWidth;
    }
  }

  getTabClasses(tab: TabData): string {
    let classes = [
      'tabs__tab',
      `tabs__tab--${this.variant}`,
      `tabs__tab--${this.size}`,
    ];

    if (tab.id === this.activeTabId) {
      classes.push('tabs__tab--active');
    }

    if (tab.disabled) {
      classes.push('tabs__tab--disabled');
    }

    if (this.fullWidth) {
      classes.push('tabs__tab--full-width');
    }

    return classes.join(' ');
  }

  trackByTab(index: number, tab: TabData): string {
    return tab.id;
  }
}
