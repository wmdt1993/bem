import { Headers, RequestOptions } from '@angular/http';

import { environment } from '../environment/environment';

import { Observable } from 'rxjs/Rx';


export abstract class BaseService {  
    
    constructor() { }

    protected buildHeader() {
        return new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.apiUrl,
            'Accept' : 'text/plain'
        });
    }

    protected buildRequestOptions() {
        let headers = this.buildHeader();
        return new RequestOptions({ headers: headers });
    }

    protected handleError(error: any) {
    var applicationError = error.headers.get('Application-Error');

    // either applicationError in header or model error in body
    if (applicationError) {
      return Observable.throw(applicationError);
    }

    var modelStateErrors: string = '';
    var serverError = error.json();

    if (!serverError.type) {
      for (var key in serverError) {
        if (serverError[key])
          modelStateErrors += serverError[key] + '\n';
      }
    }

    //modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
    return Observable.throw(modelStateErrors || 'Server error');
  }
}