import { Component } from '@angular/core';
import { AuthService } from './core/services/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public userLoaded : boolean = false
  constructor(private authService: AuthService){
    this.verifyConnection()
  }
  
  async verifyConnection(){
    try {
      const response = await this.authService.login();  
      if (response) {
        if ('id' in response)
          this.userLoaded = true;
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }
}
