import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
//import { UsersController } from './users/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/mydb'),
    UsersModule,
    UploadModule
  ],
  // controllers: [AppController, UsersController],
  // providers: [AppService],
})
export class AppModule {}
