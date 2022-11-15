import { Component, OnInit} from '@angular/core';
import { Productos } from './shared/models/productos.model';
import { IProducts } from './productos';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import axios from 'axios';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';

interface AItem {
  titulo: string,
  paginas: number,
  autor: string,
  SBN: string
};

export interface ItemTable { id: string; description: string; }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<ItemTable>;
  items: Observable<ItemTable[]>;
  title = 'gestiontienda';  
  public productos: Productos[];
  

 
  constructor(firestore: Firestore, private afs: AngularFirestore, public authService: AuthService){

    this.itemsCollection = afs.collection<ItemTable>('items');
    this.items = this.itemsCollection.valueChanges();

  this.productos = [
     new Productos (1,'Book1','Book description1', 20, 100 ),
     new Productos (2,'Book2','Book description2', 45, 200 ),
     new Productos (3,'Book3','Book description3', 32, 300 ),
     new Productos (4,'Book4','Book description4', 40, 400 ),
     new Productos (5,'Book5','Book description5', 26, 500 ),   
    
    ];

    


 }

  addItem(itemtable: ItemTable) {
  this.itemsCollection.add(itemtable);
  }

  ngOnInit() {
   // this.onNotify();
   this.productos; 
  }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }

  share() {
    window.alert('The product has been shared!');
  }

  
}
 
/*function getGithubData() {
  axios.get('https://api.github.com/users/KrunalLathiya')
    .then(res => {
      console.log(res);
    });
}

getGithubData();

function getAxiosData() {
  var api = "https://thecocktaildb.com";
  axios.get(api)
    .then(response => {    
    console.log(response);
    });  
}

getAxiosData();*/