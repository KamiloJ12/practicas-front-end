import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-form-steps',
  templateUrl: './navigation-form-steps.component.html',
  styleUrls: ['./navigation-form-steps.component.css']
})
export class NavigationFormStepsComponent {

  public currentIndex: number = 0;
  public stepsForm = [
    {
      link: '/student/register/basic-information',
      label: 'Información Personal',
      message: 'Registra tu información personal'
    },
    {
      link: '/student/register/identity-information',
      label: 'Información de identidad',
      message: 'Registra la información relacionada con tu documento de identidad'
    },
    {
      link: '/student/register/academic-information',
      label: 'Información academica',
      message: 'Registra tu información acádemica'
    },
    {
      link: '/student/register/medical-information',
      label: 'Información medica',
      message: 'Registra tu información médica'
    },
    {
      link: '/student/register/preferences',
      label: 'preferencias',
      message: 'Selecciona tus preferencias'
    },
    {
      link: '/student/register/programming-languages',
      label: 'Lenguajes de programación',
      message: 'Selecciona los lenguajes de programación de los que tengas conocimientos'
    },
    {
      link: '/student/register/frameworks',
      label: 'Frameworks',
      message: 'Selecciona los frameworks de los que tengas conocimientos'
    }
  ];

}
