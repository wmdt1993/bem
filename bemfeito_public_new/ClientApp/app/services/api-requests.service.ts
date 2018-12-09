import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class ApiRequestsService {

  headers = new HttpHeaders();
  api:string = 'http://dev.api.bemfeito.pt/api';
  constructor( 
  	private http: HttpClient
    ) {  }

    signUpApplicantTrader (data, endpoint) {
      return this.http.post(this.api + endpoint,  data)
      .map(response => {
        return response;
      },
      error => {
        alert('invalid');
      }
      );
    }

    getEstimateAccuracy (endpoint): any {
      return this.http.get(this.api + endpoint)
      .map(response => {
        return response;
      },
      error => {
        alert('invalid');
      }
      );
    }

    getCustomerIssue (endpoint): any {
      return this.http.get(this.api + endpoint)
      .map(response => {
        return response;
      },
      error => {
        alert('invalid');
      }
      );
    }

    getAllLanguages (endpoint): any {
      return this.http.get(this.api + endpoint)
      .map(response => {
        return response;
      },
      error => {
        alert('invalid');
      }
      );
    }

    getCustomerIssueNoMoneyExchanged (endpoint): any {
      return this.http.get(this.api + endpoint)
      .map(response => {
        return response;
      },
      error => {
        alert('invalid');
      }
      );
    }

    getCustomerIssueMoneyExchanged (endpoint): any {
      return this.http.get(this.api + endpoint)
      .map(response => {
        return response;
      },
      error => {
        alert('invalid');
      }
      );
    }

    getTrader (endpoint): any {
      return this.http.get(this.api + endpoint)
      .map(response => {
        return response;
      },
      error => {
        alert('invalid');
      }
      );
    }

    addReviewTrader (data, endpoint) {
    // this.headers = this.headers.set('Content-Type', 'application/json');
    // this.headers = this.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    // this.headers = this.headers.set('Accept', 'application/json, text/plain, */*');
    console.log('11');
    console.log(this.headers);
    // return this.http.post(this.api + endpoint,  data, {
    //                           headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    //                       })
    return this.http.post(this.api + endpoint,  data, {   
                              headers: new HttpHeaders().set(
                                  'Authorization', 
                                  'Bearer ' + 'a8cb7b6d1f4f46ae8a39a789a0de4b6e'
                              )
                          })
    .map(response => {
      console.log(response);
      return response;
    },
    error => {
      alert('invalid');
    }
    );
  }

}