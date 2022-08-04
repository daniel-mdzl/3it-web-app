import { Genre } from "./Genre";

export class Vote {

    constructor(
      public email: string = '',
      public genre: Genre = new Genre
    ) {  }
  
  }