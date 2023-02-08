import {
  Controller,
  Get,
  Post,
  Res,
  HttpStatus,
  Param,
  Body,
  HttpException,
  ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { UserDto } from '../dtos/user.dto';
import { UserService } from 'src/services/user.services';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('allUsers')
  getAllUsers(@Res() response: Response) {
    try {
      const allUsers = this.userService.getAllUsers();
      if (allUsers?.length === 0) {
        throw new Error('No User Exists');
        // throw new HttpException('No User Exists', HttpStatus.NOT_FOUND);
        // return response
        //   .status(HttpStatus.NOT_FOUND)
        //   .send({ message: 'No User Exists', success: false });
      }

      return response
        .status(HttpStatus.OK)
        .send({ message: 'Users found', success: true, allUsers });
    } catch (err) {
      throw new HttpException(
        { message: err.message, success: false },
        HttpStatus.NOT_FOUND,
        {
          cause: err,
        },
      );
    }
  }

  @Get(':id')
  getUserById(
    @Res() response: Response,
    @Param('id', ParseIntPipe) id: number /**  DTO (Data to Transfer) */,
  ) {
    try {
      const userByIndex = this.userService.getUserByIndex(id);

      if (!userByIndex) {
        throw new Error(`No such user with id ${id}`);
      }

      return response.status(HttpStatus.OK).send({
        success: true,
        message: 'User found',
        user: userByIndex,
      });
    } catch (err) {
      throw new HttpException(
        { message: err.message, success: false },
        HttpStatus.NOT_FOUND,
        {
          cause: err,
        },
      );
    }
  }

  @Post('addUser')
  addUser(@Body() userInformation: UserDto, @Res() response: Response) {
    try {
      const userAdded = this.userService.create(userInformation);

      if (!userAdded) {
        throw new Error('Unable to add the user');
      }
      return response.status(HttpStatus.OK).send({
        message: 'User added',
        user: userInformation,
      });
    } catch (err) {
      throw new HttpException(
        { message: err.message, success: false },
        HttpStatus.NOT_IMPLEMENTED,
        { cause: err },
      );
    }
  }
}
