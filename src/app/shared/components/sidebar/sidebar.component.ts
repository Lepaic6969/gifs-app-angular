import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @ViewChild('button_gifs_historial')
  public button!:ElementRef<HTMLButtonElement>

  constructor(private gifsService:GifsService){};

  get tags ():string[]{
    return this.gifsService.tagsHistory ;
  }

  updateGifs(tag:string):void{
    this.gifsService.searchTag(tag);  
  }
}
