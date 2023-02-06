import { Controller, Get, Post, Res, HttpStatus, Param } from '@nestjs/common';
import { Response } from 'express';

@Controller('user')
export class UserController {
  @Get('allUsers')
  getAllUsers(@Res() response: Response) {
    return response
      .status(HttpStatus.OK)
      .send({ message: 'This function will return all the users' });
  }

  @Get(':id')
  getUserById(
    @Res() response: Response,
    @Param() params: { id: number } /**  DTO (Data to Transfer) */,
  ) {
    return response.status(HttpStatus.OK).send({
      message: 'This function will return the users with Id: ',
      params,
    });
  }

  @Post('addUser')
  addUser() {
    return 'This function will add the user';
  }
}
