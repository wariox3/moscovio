import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../../components/slider/slider.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  standalone: true,
  imports: [CommonModule, SliderComponent],
})
export class InicioComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // Inicialización del componente
  }
}
