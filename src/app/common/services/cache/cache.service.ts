export class CacheService {

  data : any = {};

  get(key : string){
    return this.data[key];
  }

  set(key, value, replace: boolean = true){
    if(key in this.data && !replace)
      return; //already cached and can't update
    this.data[key] = value;

  }

  destroy(key){

  }

  static ref(){
    return new CacheService();
  }

}
