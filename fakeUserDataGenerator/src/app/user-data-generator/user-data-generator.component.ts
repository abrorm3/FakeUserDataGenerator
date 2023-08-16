import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from './user.service';

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
  atBottom = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.generateData();
  }
  onScroll(elem: any) {
    console.log('Scroll event triggered');
    if ((elem.offsetHeight + elem.scrollTop) >= elem.scrollHeight) {
      console.log("It's Lit");
    }
  }

  generateData() {
    this.userService.generateUserData(this.selectedRegion).subscribe(
      (userData) => {
        this.users = userData;
        console.log(this.users);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
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
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    //In chrome and some browser scroll is given to body tag
    let pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if (pos == max) {
      //Do your action here
    }
  }
}
