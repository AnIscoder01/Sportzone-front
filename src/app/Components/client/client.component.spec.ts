import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import for HttpClient dependencies
import { ClientComponent } from './client.component';
import { ClientService } from '../../Services/client.service'; // Import your service
import { of } from 'rxjs'; // For mocking observables

describe('ClientComponent', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;
  let mockClientService: jasmine.SpyObj<ClientService>;

  beforeEach(async () => {
    // Create a mock ClientService
    mockClientService = jasmine.createSpyObj('ClientService', ['getUserList']);
    mockClientService.getUserList.and.returnValue(of([])); // Mock response as an empty array

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ClientComponent], // Include necessary modules
      providers: [
        { provide: ClientService, useValue: mockClientService }, // Use the mock service
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger ngOnInit and data binding
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUserList on initialization', () => {
    expect(mockClientService.getUserList).toHaveBeenCalled();
  });

  it('should initialize users as an empty array when getUserList returns no data', () => {
    expect(component.users).toEqual([]);
  });
});
