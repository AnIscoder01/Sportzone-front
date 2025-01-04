import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './Components/client/client.component';
import { AuthComponent } from './Components/auth/auth.component';
import { HomeComponent } from './Components/home/home.component';
import { SallesSportComponent } from './Components/salledesport/salledesport.component';
import { SalleDetailComponent } from './Components/salle-detail/salle-detail.component';

export const routes: Routes = [
    { path: "client/all", component: ClientComponent, title: 'client' },
    { path: "signup", component: AuthComponent, title: 'signup' },
    { path: "", component: HomeComponent, title: 'home'},
    { path: 'salledesport/:id', component: SalleDetailComponent },
    { path: "salledesport", component:SallesSportComponent, title: 'salles'}

];