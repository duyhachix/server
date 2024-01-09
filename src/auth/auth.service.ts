// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UserService } from '../user/user.service';

// @Injectable()
// export class AuthService {
//   constructor(private userService: UserService) {}
//   async testSignIn(email: string, pass: string): Promise<any> {
//     const user = await this.userService.testFindOne(email);
//     if (!user) {
//       throw new UnauthorizedException('User not found');
//     }
//     return { user };
//   }
// }
