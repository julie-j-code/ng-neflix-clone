import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';


// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireStorageModule } from '@angular/fire/compat/storage';
// import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
// import { AngularFireAuthModule } from "@angular/fire/compat/auth";

// import { AngularFireModule } from '@angular/fire';
// import { AngularFireAuthModule, AngularFireAuth } from "@angular/fire/auth";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';


import { AppComponent } from './app.component';
import { RowsComponent } from './components/rows/rows.component';
import { BannerComponent } from './components/banner/banner.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieComponent } from './pages/movie/movie.component';
import { AccountComponent } from './components/account/account.component';
import { environment } from './environment/environment';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './login/login.component';
// import { AuthService } from './auth.service';
// import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    RowsComponent,
    BannerComponent,
    HomeComponent,
    MovieComponent,
    AccountComponent,
    RegisterComponent,
    LoginComponent
    // RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    // https://stackoverflow.com/questions/68939014/angularfiremodule-and-angularfiredatabasemodule-not-being-found-in-angular-fire
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireStorageModule,
    // AngularFireAuthModule],
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
