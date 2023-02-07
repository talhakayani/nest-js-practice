import {
  Controller,
  Get,
  Post,
  Res,
  HttpStatus,
  Param,
  Body,
} from '@nestjs/common';
import { Response } from 'express';
import { UserDto } from '../dtos/user.dto';
import { UserService } from 'src/services/user.services';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('allUsers')
  getAllUsers(@Res() response: Response) {
    const allUsers = this.userService.getAllUsers();
    if (allUsers?.length === 0) {
      return response
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'No User Exists', success: false });
    }

    return response
      .status(HttpStatus.OK)
      .send({ message: 'Users found', success: true, allUsers });
  }

  @Get(':id')
  getUserById(
    @Res() response: Response,
    @Param() params: { id: number } /**  DTO (Data to Transfer) */,
  ) {
    const userByIndex = this.userService.getUserByIndex(params.id);

    if (!userByIndex) {
      return response.status(HttpStatus.NOT_FOUND).send({
        message: `No such user with id ${params.id}`,
        success: false,
      });
    }

    return response.status(HttpStatus.OK).send({
      success: true,
      message: 'User found',
      user: userByIndex,
    });
  }

  @Post('addUser')
  addUser(@Body() userInformation: UserDto, @Res() response: Response) {
    const userAdded = this.userService.create(userInformation);

    if (userAdded) {
      return response.status(HttpStatus.OK).send({
        message: 'User added',
        user: userInformation,
      });
    }
  }
}
