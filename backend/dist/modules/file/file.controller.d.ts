/// <reference types="multer" />
export declare class FileController {
    uploadFile(file: Express.Multer.File): {
        filename: string;
        mimetype: string;
        size: number;
        path: string;
    };
}
