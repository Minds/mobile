import {Injectable} from '@angular/core';

export class Storage {

	get(key : string) : boolean | string{
		let val = window.localStorage.getItem(key);
		if(val){
			try {
				return JSON.parse(val);
			} catch (e) {
				return val;
			}
		}
		return null;
	}

	set(key : string, value : any){
		return window.localStorage.setItem(key, JSON.stringify(value));
	}

	destroy(key : string){
		return window.localStorage.removeItem(key);
	}

	clear() {
		return window.localStorage.clear();
	}

}
