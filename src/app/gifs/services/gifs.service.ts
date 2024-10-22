
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root' //Esto hace que el servicio sea global en mi app
})
export class GifsService {
 
  private _tagsHistory:string[]=[];
  private apiKey:string='qKk870h7YCB4WDOnzX5tV7P4t9zp7qOt'; //Ya llave de la api que vamos a consumir
  private baseEndponit:string='https://api.giphy.com/v1/gifs';
  public gifList:Gif[]=[];

  constructor(private http:HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready');
   } 

  get tagsHistory(){
    return [...this._tagsHistory]; //Para romper la referencia de JS y sólo pueda 
  }
  private organizeHistory(tag:string){
    tag=tag.toLowerCase();
    //Verifico si ya existe este tag en mi arreglo, si existe lo elimino y lo vuelvo a agregar al inicio
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory=this._tagsHistory.filter(oldTag=>oldTag!==tag); 
    }
    this._tagsHistory.unshift(tag); //Para que lo agregue al inicio

    //Ahora voy a limitar mi arreglo a 10 elementos y voy a guardar las actualizaciones en el Local Storage
    this._tagsHistory=this._tagsHistory.splice(0,10); 
    this.saveLocalStorage(); //Si cambian mis tags, realizo la actualización en el localStorage
  }
  private saveLocalStorage():void{
    localStorage.setItem('history',JSON.stringify(this._tagsHistory));
  }
  private loadLocalStorage():void{
    if(!localStorage.getItem('history')) return;
    this._tagsHistory= JSON.parse(localStorage.getItem('history')!);
    //Sólo si se carga algún historial del LocalStorage muestro los gifs de la última búsqueda al cargar mi aplicación.
    if(this._tagsHistory.length===0) return;
    this.searchTag(this._tagsHistory[0]);
  } 
  searchTag(tag:string):void{
    //Validaciones del tag
    if(tag.length===0) return;
    this.organizeHistory(tag); 
    
    //Petición HTTP
    /* PRIMERA FORMA -> Con Fetch
    fetch('https://api.giphy.com/v1/gifs/search?api_key=qKk870h7YCB4WDOnzX5tV7P4t9zp7qOt&q=valorant&limit=10')
      .then(resp=>resp.json())
      .then(data=>console.log(data)); */

    /* SEGUNDA FORMA -> Con Async/Await
    const resp=await fetch('https://api.giphy.com/v1/gifs/search?api_key=qKk870h7YCB4WDOnzX5tV7P4t9zp7qOt&q=valorant&limit=10');
    const data= await resp.json();
    console.log(data); */

    /**TERCERA FORMA -> COMO SE HACE EN ANGULAR */
     
    //NOTA: Para agregarle el tipo de dato a la respuesta HTTP, se utiliza->app.quicktype.io, se copia la respuesta y se la pega en este sitio
    //Se selecciona Typescript y que sólo nos muestre las interfaces y listo, estas interfaces generadas las
    //utilizo en mi proyecto.
    const params=new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit','10')
      .set('q',tag);

    this.http.get<SearchResponse>(`${this.baseEndponit}/search`,{params})
      .subscribe((resp)=>{
          this.gifList=resp.data;
      });
 



     
  }    

}
