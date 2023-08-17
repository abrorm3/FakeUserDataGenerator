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
        const userDataWithErrors = this.applyErrors(userData, this.errorAmount);
        this.users = userDataWithErrors;
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
  }

  // start of error
  applyErrors(userData: any[], errorProbability: number): any[] {
    const userDataWithErrors: any[] = [];
    for (const user of userData) {
      const userWithErrors = { ...user };
      if (Math.random() < errorProbability) {
        userWithErrors.name = this.applyRandomError(userWithErrors.name);
      }
      userDataWithErrors.push(userWithErrors);
    }
    return userDataWithErrors;
  }

  applyRandomError(name: string): string {
    const errorTypes = ['delete', 'add', 'swap'];
    const randomErrorType = errorTypes[Math.floor(Math.random() * errorTypes.length)];

    switch (randomErrorType) {
      case 'delete':
        return this.applyDeleteError(name);
      case 'add':
        return this.applyAddError(name);
      case 'swap':
        return this.applySwapError(name);
      default:
        return name;
    }
  }

  applyDeleteError(text: string): string {
    const randomIndex = Math.floor(Math.random() * text.length);
    return text.slice(0, randomIndex) + text.slice(randomIndex + 1);
  }

  applyAddError(text: string): string {
    const randomIndex = Math.floor(Math.random() * text.length);
    const randomCharacter = this.getRandomCharacter();
    return text.slice(0, randomIndex) + randomCharacter + text.slice(randomIndex);
  }

  applySwapError(text: string): string {
    const charArray = text.split('');
    const randomIndex = Math.floor(Math.random() * (charArray.length - 1));
    [charArray[randomIndex], charArray[randomIndex + 1]] = [charArray[randomIndex + 1], charArray[randomIndex]];
    return charArray.join('');
  }

  getRandomCharacter(): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet.charAt(randomIndex);
  }
  // end of error


  generateRandomSeed() {
    this.seed = Math.floor(Math.random() * 1000000); // Generate a random seed
    this.generateData();
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
