import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../Services/client.service';
import { Client } from '../../Interfaces/client';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'] 
})
export class ClientComponent implements OnInit {
  users: Client[] = []; 

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getUserList().subscribe(data=>{
      this.users=data
    }
      
    );
  }
}
