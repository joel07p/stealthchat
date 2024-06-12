import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller('file')
export class FileController {/* 
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
                cb(null, uniqueSuffix);
            },
        }),
    }))
    uploadFile(@UploadedFiles()) {
        return {
            /* originalname: file.originalname,
            filename: file.filename,
            mimetype: file.mimetype,
            size: file.size,
            path: `uploads/${file.filename}`, 
        };
    } */
}
