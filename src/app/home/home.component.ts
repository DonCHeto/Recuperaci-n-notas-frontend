import { Component } from '@angular/core';
import { NotaComponent } from '../nota/nota.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NotaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
