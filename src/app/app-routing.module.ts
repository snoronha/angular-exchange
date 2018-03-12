import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AccountsComponent } from './accounts/accounts.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',            component: HomeComponent },
    { path: 'login',           component: LoginComponent },
    { path: 'accounts',        component: AccountsComponent },
    { path: 'users',
      children: [
          { path: '', component: UserEditComponent },
          { path: 'edit/:id', component: UserEditComponent },
      ]
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule,
    ],
    providers: []
})

export class AppRoutingModule { }
