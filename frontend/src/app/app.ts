import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-root',
  standalone: true, // Ensure standalone is true for root component
  imports: [RouterOutlet, RouterModule], // Add RouterModule to imports
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend')
}
