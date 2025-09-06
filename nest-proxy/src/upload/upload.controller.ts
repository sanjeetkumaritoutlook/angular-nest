import { Controller, Post,
  UploadedFile,
  UseInterceptors, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
//import { Multer } from 'multer';   // from @types/multer
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { v4 as uuidv4 } from 'uuid'
if (!existsSync('./uploads')) mkdirSync('./uploads', { recursive: true });
@Controller('upload')
export class UploadController {
     @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({   //disk storage means file system
        destination: './uploads', // folder to store files
        filename: (req, file, cb) => {
          // const uniqueSuffix =
          //   Date.now() + '-' + Math.round(Math.random() * 1e9);
          // cb(null, uniqueSuffix + extname(file.originalname));
           cb(null, uuidv4() + extname(file.originalname));
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
      fileFilter: (req, file, cb) => {
          if (
            file.mimetype === 'application/pdf' ||
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/png'
          ) {
            cb(null, true);
          } else {
            cb(new Error('Only PDF, JPG, PNG are allowed!'), false);
          }
        },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
   if (!file) {
      return { message: '❌ No file uploaded', filename: null };
    }
    return {
      message: 'File uploaded successfully',
      filename: file.originalname,
      storedName: file.filename,
      path: file.path,
    };
  }
}
