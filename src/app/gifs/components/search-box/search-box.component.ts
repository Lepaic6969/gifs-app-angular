import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

// @Component({
//   selector: 'gifs-search-box',
//   template:`
//     <h5>Buscar: </h5>
//     <input type="text"
//     class="form-control"
//     placeholder="Buscar Gifs..."
//     (keyup.enter)="searchTag(txtTagInput.value)"
//     #txtTagInput
//     >
  
//   ` 
// })
@Component({
  selector: 'gifs-search-box',
  template:`
    <h5>Buscar: </h5>
    <input type="text"
    class="form-control"
    placeholder="Buscar Gifs..."
    (keyup.enter)="searchTag()"
    #txtTagInput
    >
  
  ` 
})
export class SearchBoxComponent {
  constructor(private gifsService:GifsService){};
    /*
  searchTag(newTag:string){ 
    console.log({newTag});
     this.gifsService.searchTag(newTag);
  } */
  
  @ViewChild('txtTagInput')
  public   tagInput!:ElementRef<HTMLInputElement>;

  searchTag(){
    const newTag=this.tagInput.nativeElement.value; 
    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value=''; //Reseteo la caja de texto
  }


  



}
