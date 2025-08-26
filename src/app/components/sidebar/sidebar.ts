import { Component, OnInit, signal, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { SidebarItem } from './types/sidebar.model';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    DrawerModule,
    ButtonModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit, AfterViewInit {
  protected visible = signal<boolean>(false);
  sidebarItems: SidebarItem[] = [
    { label: 'Home', icon: 'pi pi-home', route: '/' },
    { label: 'Call History', icon: 'pi pi-phone', route: '/call-history' },
    { label: 'Assistants', icon: 'pi pi-users', route: '/assistants' },
    { label: 'Knowledge Base', icon: 'pi pi-book', route: '/knowledge-base' },
    { label: 'Profile', icon: 'pi pi-user', route: '/profile' },
  ];
  constructor(public router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}
}
