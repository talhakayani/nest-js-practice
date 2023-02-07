import { Injectable } from '@nestjs/common';
import { UserDto } from '../interfaces/user.interface';

Injectable();
export class UserService {
  private readonly users: UserDto[] = [];

  create(userInformation: UserDto) {
    this.users.push(userInformation);
    return true;
  }

  getAllUsers() {
    return this.users;
  }

  getUserByIndex(index: number) {
    return this.users[index];
  }
}
