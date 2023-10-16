import { Component, inject } from '@angular/core';
import { StudentsService } from '../../../student/services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {

  private studentsService = inject(StudentsService);
  public students: any[] = [];
  
  products = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
  ]

  ngOnInit(): void {
    this.studentsService.getStudents()
      .subscribe(students => this.students = students,
      );
    console.log(this.students);
  }
}
