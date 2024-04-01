import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {timer} from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { SkillsComponent } from './skills/skills.component';
import { ExperienceComponent } from './experience/experience.component';
import { MitComponent } from './mit/mit.component';
import { HobbieComponent } from './hobbie/hobbie.component';
import { KonamiCodeModule } from 'ngx-konami-code';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule,SkillsComponent,ExperienceComponent,MitComponent,HobbieComponent,KonamiCodeModule],
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
  public _pixelart:boolean = false;
  public _cortina:boolean = false;

  private readonly route = inject(ActivatedRoute);
  #router = inject(Router);

  public _me = '../assets/images/me.webp'

  public OpenLanguaje='close';


  constructor(private http: HttpClient) {}
  

   async ngOnInit():Promise<void>{

    this.translate = this.getTranslation(this.lang);

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

    this._pixelart = false;
    this._me = '../assets/images/me.webp';

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


  pixelart(){
    this._cortina = true;
    timer(1000).subscribe(_=>{
      window.scrollTo(0, 0);
      
      this.isLightTheme=true;
      if(!this._pixelart){
      document.body.setAttribute('data-theme','konami');
      this._me = '../assets/images/me_cartoon.webp';
      this._pixelart = true;
      }else{
        document.body.setAttribute('data-theme','light');
        this._me = '../assets/images/me.webp';
        this._pixelart = false;
      }

      timer(500).subscribe(()=>{
        this._cortina = false;
      })

    });
   
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