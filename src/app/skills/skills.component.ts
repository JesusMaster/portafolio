import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit {
  @Input() skills:any=null;

  ngOnInit():void{

  }

}
