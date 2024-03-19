import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, delay, timer} from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { SkillsComponent } from './skills/skills.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule,SkillsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  
  public isLightTheme = true;
  public lang = "es";
  public movimiento = 'ingreso';
  public slogan:any;
  public translate:any;
  public info:any;
  public messages: any = {};
  public counter=0;

  public OpenLanguaje='close';


  constructor(private http: HttpClient) {}
  

   async ngOnInit():Promise<void>{

    this.translate = await this.getTranslation(this.lang);

    this.translate.subscribe((_data:any)=>{
      this.info = _data;
      this.messages[this.lang] = this.info.front.slogan;
      this.showSlogan(this.movimiento);
    });    

    document.body.setAttribute(
      'data-theme',
      this.isLightTheme ? 'light' : 'dark'
    );

  }


  getTranslation(lang: string) {
    return this.http.get(`./assets/lang/${lang}.json`);
  }


  showSlogan(_type: any):any{
    this.movimiento = _type;

    if(this.counter==this.messages[this.lang].length){
     this.counter=0;
    }

    this.slogan = this.messages[this.lang][this.counter];

    timer(5000).subscribe(_=>{
      this.hideSlogan('salida');
    });
    this.counter ++;
  }


  hideSlogan(_type: any){
    this.movimiento = _type;
    timer(1000).subscribe(_=>{
      this.showSlogan('ingreso');
    })
  }


  openLanguaje(){  
    switch (this.OpenLanguaje) {
      case 'open':
        this.OpenLanguaje = 'close';
        break;
      case 'close':
        this.OpenLanguaje = 'open';
        break;
      default:
        this.OpenLanguaje = 'close';
        break;
    }
  }

  changeColor(): void{

    if(this.isLightTheme){
      this.isLightTheme=false
    }else{
      this.isLightTheme=true
    }

    document.body.setAttribute(
      'data-theme',
      this.isLightTheme ? 'light' : 'dark'
    );

  }

  async toggleLanguage(_lan: any):Promise<void> { 

    this.lang= _lan;

    this.translate = await this.getTranslation(_lan);
    this.translate.subscribe((_data:any)=>{
      this.info = _data;
      this.messages[_lan] = this.info.front.slogan;
      this.OpenLanguaje = 'close';
    });
  }


}