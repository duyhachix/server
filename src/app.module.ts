import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// internal modules
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
// import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'nest_login',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    ProductModule,
    // AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
