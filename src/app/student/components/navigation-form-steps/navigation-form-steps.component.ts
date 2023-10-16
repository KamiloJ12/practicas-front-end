import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-form-steps',
  templateUrl: './navigation-form-steps.component.html',
  styleUrls: ['./navigation-form-steps.component.css']
})
export class NavigationFormStepsComponent {

  public stepsForm = [
    {
      link: '/student/register/basic-information',
      label: 'Información Personal'
    },
    {
      link: '/student/register/identity-information',
      label: 'Información de identidad'
    },
    {
      link: '/student/register/academic-information',
      label: 'Información academica'
    },
    {
      link: '/student/register/medical-information',
      label: 'Información medica'
    },
    {
      link: '/student/register/preferences',
      label: 'preferencias'
    },
    {
      link: '/student/register/programming-languages',
      label: 'Lenguajes de programación'
    },
    {
      link: '/student/register/frameworks',
      label: 'Frameworks'
    }
  ];

}
