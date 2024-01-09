// import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { SignInDto } from './dtos/SignIn.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @HttpCode(HttpStatus.OK)
//   @Post('login')
//   testSignIn(@Body() signInDto: SignInDto) {
//     return this.authService.testSignIn(signInDto.email, signInDto.password);
//   }
// }
