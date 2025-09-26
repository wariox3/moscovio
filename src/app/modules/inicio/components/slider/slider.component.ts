import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Importar estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
})
export class SliderComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  swiper?: Swiper;
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

  constructor() { }

  ngOnInit(): void {
    // Registrar los módulos de Swiper que vamos a usar
    Swiper.use([Navigation, Pagination, Autoplay]);
  }

  ngAfterViewInit(): void {
    // Inicializar Swiper después de que la vista esté lista
    this.initSwiper();
  }

  ngOnDestroy(): void {
    // Destruir la instancia de Swiper cuando el componente se destruye
    if (this.swiper) {
      this.swiper.destroy();
    }
  }

  private initSwiper(): void {
    // Crear una nueva instancia de Swiper
    this.swiper = new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}
