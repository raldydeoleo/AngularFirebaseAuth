import { Component, OnInit } from '@angular/core';
import { Productos } from 'src/app/shared/models/productos.model';
import { IProducts } from 'src/app/productos';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import axios from 'axios';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';//este
import { AuthService } from '../../shared/services/auth.service';
import { OrdersService } from 'src/app/shared/services/orders.service';


interface AItem {
  titulo: string,
  paginas: number,
  autor: string,
  SBN: string
};

export interface ItemTable { id: string; description: string; }

export interface Todo {
  id?: string;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  
  todoCollectionRef: AngularFirestoreCollection<Todo>;
  todo$: Observable<Todo[]>;
  itemsCollection: AngularFirestoreCollection<ItemTable>;
  item$: Observable<ItemTable[]>;

  title = 'gestiontienda';  
  public productos: Productos[];

  constructor(firestore: Firestore, 
              private afs: AngularFirestore, 
              public authService: AuthService, 
              private ordersService: OrdersService ) {

    this.todoCollectionRef = this.afs.collection('todos'); // a ref to the todos collection
    this.todo$ = this.todoCollectionRef.valueChanges();
    this.itemsCollection = afs.collection<ItemTable>('items');
    this.item$ = this.itemsCollection.valueChanges();
   

  this.productos = [
     new Productos (1,'Book1','Book description1', 20, 100 ),
     new Productos (2,'Book2','Book description2', 45, 200 ),
     new Productos (3,'Book3','Book description3', 32, 300 ),
     new Productos (4,'Book4','Book description4', 40, 400 ),
     new Productos (5,'Book5','Book description5', 26, 500 ),   
    
    ];
    
    //coffees = ["Americano", "Flat White", "Cappuccino", "Latte", "Espresso", "Machiato", "Mocha", "Hot Chocolate", "Tea"];

  }
  ngOnInit(): void {
    
    this.todoCollectionRef = this.afs.collection('todos'); // una  referencia a la  collection todos
    this.todo$ = this.todoCollectionRef.valueChanges();    
    this.getCoffeeOrders();
  }


  //coffeeOrders;  

  getCoffeeOrders = ()   => {
     //let test = this.ordersService.getCoffeeOrders().subscribe(res => (this.coffeeOrders = res));       
  }

/*

onSubmit() {

    this.ordersService.form.value.coffeeOrder = this.coffeeOrder;
    let data = this.ordersService.form.value;
    
    this.ordersService.createCoffeeOrder(data)
       .then(res => {
           //do something here....maybe clear the form or give a success message
       });
  }*/




  addTodo(todoDesc: string) {
    if (todoDesc && todoDesc.trim().length) {
      this.todoCollectionRef.add({ description: todoDesc, completed: false });
    }
  }

  updateTodo(todo: Todo) {
    this.todoCollectionRef.doc(todo.id).update({ completed: !todo.completed });
  }
  
  deleteTodo(todo: Todo) {
    this.todoCollectionRef.doc(todo.id).delete();
  }
}