import { Component,OnInit } from '@angular/core';
import { ClientService } from '../../Services/client.service';
import { Client } from '../../Interfaces/client';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit{
  users: Client[] = [];
  constructor (private clientService:ClientService){}
  ngOnInit(): void {
    this.clientService.getUserList().subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error('Error fetching users:', err)
    });
  }

}
