import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieComponent } from './pages/movie/movie.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'movie/:id',component:MovieComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {
    path: 'account',
    component: AccountComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/register']))
  },
  {path:'verify-email', component:VerifyEmailComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
