import { Component, OnInit, Input } from '@angular/core';
import { ProductTemplate } from '../../../Store/models/product-template.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

interface Process {
  name: string;
  duration: number;
}

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {
  @Input()
  product: ProductTemplate;
  public tiles: any;

  processes: Process[] = [];

  targetBuilderTools = [{ name: 'Dogs' }];
  constructor() {}

  ngOnInit() {
    this.processes.push({
      name: 'Cut wood',
      duration: 10
    });
    this.processes.push({
      name: 'Carve Grooves',
      duration: 2
    });
    this.processes.push({
      name: 'CNC',
      duration: 8
    });
    this.processes.push({ name: 'Paint', duration: 8 });
    this.processes.push({ name: 'SandBlast', duration: 8 });
  }

  drop(event: CdkDragDrop<Process[]>) {
    moveItemInArray(this.processes, event.previousIndex, event.currentIndex);
  }
}
