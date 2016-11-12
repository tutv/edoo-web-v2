import { Injectable } from '@angular/core';

@Injectable()
export class LogService {

  constructor() { }

    public static i(tag: string, msg: string){
        console.info(`INFO: ${tag} : ${msg}`);
    }

    public static e(tag: string, msg: string){
        console.error(`ERROR: ${tag} : ${msg}`);
    }
}
