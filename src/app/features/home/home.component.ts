import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Tabs } from '../../core/models/enums/Tabs.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public currentTab : string = Tabs.Transactions;
  public currentTabTitle : string = "Portal Transacciones"
  public tabs = Tabs;

  constructor(){
  }

  @ViewChild('drawer') drawer!: MatSidenav; 

  async switchTab(newTab:string){
    this.currentTab = newTab;
    this.drawer.close();
    switch(newTab){
      case Tabs.Transactions:
        this.currentTabTitle = 'Portal Transacciones'
        break;
      case Tabs.TransactionHistory:
        this.currentTabTitle = 'Historial Transacciones'
        break;
    }
  }
}
