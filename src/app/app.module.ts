import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
//import { AngularFireStore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';  //este
import { AngularFireModule } from '@angular/fire/compat'; //este
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {getAuth, provideAuth} from '@angular/fire/auth';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthService } from "./shared/services/auth.service";
import { OrdersService } from './shared/services/orders.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent
  ],
  imports: [
   BrowserModule,
   AppRoutingModule,    
   AngularFireModule.initializeApp(environment.firebase),
   AngularFireAuthModule,   
   AngularFirestoreModule,
   AngularFireStorageModule,
   AngularFireDatabaseModule,
   provideFirebaseApp(() => initializeApp(environment.firebase)),
   provideFirestore(() => getFirestore()),
   provideAuth(() => getAuth()),
  ],
  providers: [AuthService, OrdersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
