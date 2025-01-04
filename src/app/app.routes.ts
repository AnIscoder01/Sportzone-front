import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './Components/client/client.component';
import { AuthComponent } from './Components/auth/auth.component';
import { HomeComponent } from './Components/home/home.component';
import { SallesSportComponent } from './Components/salledesport/salledesport.component';
import { DetailsalleComponent } from './Components/detailsalle/detailsalle.component';
import { AbonnementComponent } from './Components/abonnements/abonnements.component';

export const routes: Routes = [
    { path: "client/all", component: ClientComponent, title: 'client' },
    { path: "signup", component: AuthComponent, title: 'signup' },
    { path: "", component: HomeComponent, title: 'home'},
    { path: "salledesport", component:SallesSportComponent, title: 'salles'},
    { path: "detailsalle/:id",component:DetailsalleComponent,title:'details'},
    { path: "abonnement",component:AbonnementComponent,title:'abonnement'}
];