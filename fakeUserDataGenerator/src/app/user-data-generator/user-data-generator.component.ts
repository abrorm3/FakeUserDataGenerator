import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from './user.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';


@Component({
  selector: 'app-user-data-generator',
  templateUrl: './user-data-generator.component.html',
  styleUrls: ['./user-data-generator.component.css'],
})
export class UserDataGeneratorComponent implements OnInit {
  errorAmount = 0;
  users: any[] = [];
  seed: number = 42;
  selectedRegion: string = 'usa';
  currentPage = 20;


  constructor(private userService: UserService) {}

  @ViewChild('virtualScrollElement') virtualScrollElement!: CdkVirtualScrollViewport;

  ngOnInit(): void {
    this.generateData();
  }

  generateData() {
    this.userService.generateUserData(this.seed, this.selectedRegion, this.currentPage).subscribe({
      next: (userData) => {
        this.users = userData;
        console.log(this.selectedRegion);

      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
  }


  generateRandomSeed() {
    this.seed = Math.floor(Math.random() * 1000000); // Generate a random seed
  }
  generateRandomIdentifier(name: string, seed: number): string {
    // Combine name and seed to generate a random identifier
    const concatenatedValue = seed.toString();

    // Simulate some operation to generate an identifier
    // For example, you could hash the concatenated value or apply some custom logic
    const hashedValue = this.hashFunction(concatenatedValue);

    return hashedValue;
  }

  private hashFunction(value: string): string {
    // This is a placeholder for a hash function or any other logic you want to use
    // You can use libraries like crypto-js for hashing if needed
    return value; // Replace this with your actual hash
  }
  onVirtualScrollScrolled(index: number): void {

    const endBuffer = 12; // Number of records to load before reaching the end
    const totalRecords = this.users.length;

    // Calculate the index that would trigger the data fetching
    const triggerIndex = totalRecords - endBuffer;

    if (index >= triggerIndex && index < totalRecords) {
      // Fetch more data and append it to the users array
      console.log('Fetching additional 20 records');
      this.currentPage = this.currentPage+20;
      this.generateData()
    }
  }

}
