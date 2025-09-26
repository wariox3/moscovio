import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class SliderComponent implements OnInit {
  slides = [
    {
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
      title: 'Transporte de carga eficiente',
      description: 'Conectamos empresas con transportistas de confianza para optimizar tu logística',
    },
    {
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1200&auto=format&fit=crop',
      title: 'Seguimiento en tiempo real',
      description: 'Monitorea tus envíos desde cualquier lugar con nuestra plataforma',
    },
    {
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1200&auto=format&fit=crop',
      title: 'Soluciones para todo tipo de carga',
      description: 'Contamos con transportistas especializados para cualquier tipo de mercancía',
    },
  ];

  currentSlide = 0;
  autoplayInterval: any;

  constructor() { }

  ngOnInit(): void {
    this.startAutoplay();
  }

  startAutoplay(): void {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }
}
