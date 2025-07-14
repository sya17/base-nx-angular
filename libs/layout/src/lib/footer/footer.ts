import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FooterLink {
  label: string;
  url: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'lib-footer',
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  @Input() companyName = 'Your Company';
  @Input() companyDescription = 'Building amazing experiences for the modern web.';
  @Input() year = new Date().getFullYear();
  @Input() showSocialLinks = true;
  @Input() showFooterSections = true;
  @Input() customSections: FooterSection[] = [];
  @Input() customSocialLinks: SocialLink[] = [];

  defaultSections: FooterSection[] = [
    {
      title: 'Product',
      links: [
        { label: 'Features', url: '/features' },
        { label: 'Pricing', url: '/pricing' },
        { label: 'Documentation', url: '/docs' },
        { label: 'API Reference', url: '/api' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', url: '/about' },
        { label: 'Careers', url: '/careers' },
        { label: 'Blog', url: '/blog' },
        { label: 'Contact', url: '/contact' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', url: '/help' },
        { label: 'Community', url: '/community' },
        { label: 'Status', url: '/status', external: true },
        { label: 'Report Bug', url: '/bug-report' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', url: '/privacy' },
        { label: 'Terms of Service', url: '/terms' },
        { label: 'Cookie Policy', url: '/cookies' },
        { label: 'GDPR', url: '/gdpr' }
      ]
    }
  ];

  defaultSocialLinks: SocialLink[] = [
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: 'fab fa-twitter'
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com',
      icon: 'fab fa-facebook'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: 'fab fa-linkedin'
    },
    {
      name: 'GitHub',
      url: 'https://github.com',
      icon: 'fab fa-github'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com',
      icon: 'fab fa-instagram'
    }
  ];

  get footerSections(): FooterSection[] {
    return this.customSections.length > 0 ? this.customSections : this.defaultSections;
  }

  get socialLinks(): SocialLink[] {
    return this.customSocialLinks.length > 0 ? this.customSocialLinks : this.defaultSocialLinks;
  }

  onLinkClick(link: FooterLink): void {
    if (link.external) {
      window.open(link.url, '_blank', 'noopener,noreferrer');
    }
    // For internal links, let Angular routing handle it
  }

  onSocialClick(social: SocialLink): void {
    window.open(social.url, '_blank', 'noopener,noreferrer');
  }

  getCurrentTimestamp(): string {
    return new Date().toISOString().slice(0, 10).replace(/-/g, '');
  }
}