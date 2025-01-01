import { Employee } from "./data-contracts";

export const mockEmployees: Employee[] = [{
    id: 1,
    nationality: 'US',
    departmentId: 2,
    keycardId: 'ABC123',
    account: '123456789',
    salary: 100000,
    office: ['San Francisco', 'United States of America'],
    firstName: 'John',
    lastName: 'Doe',
    title: 'Software Engineer',
    contractType: 'CONTRACT',
    email: 'john.doe@example.com',
    hiredAt: '2022-01-01',
    expiresAt: '2023-01-01',
    personalInfo: {
      age: 30,
      phone: '123-456-7890',
      email: 'john.doe@example.com',
      dateOfBirth: '1992-01-01',
      address: {
        street: '123 Main St',
        city: 'Anytown',
        country: 'USA',
      },
    },
    skills: ['JavaScript', 'Angular', 'Node.js'],
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imgURL: 'https://example.com/image.jpg',
}];
