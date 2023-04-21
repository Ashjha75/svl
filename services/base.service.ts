import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';



@Injectable()
export abstract class BaseService {
  private _http: HttpClient;
  constructor(_http: HttpClient) {
    this._http = _http;
  }



  protected static createMessageDiv(html, type) {
    const div = document.createElement('div');
    html = html.trim(); // Never return a text node of whitespace as the result
    div.setAttribute('class', type);
    div.innerHTML = html;
    return div;
  }



  protected extractData(res) {
    if (res.status === 302) {

      const redir = res.headers.get('Location');
      if (redir && redir.indexOf('mhcauth') !== -1) {
        alert('Session has timed out!');
        window.location.href = '/';
      }
    } else if (res.status !== 403) {
      environment.lastApiHitTimestamp = new Date().getTime(); // Resetting last API HIT, which is used in session timeout timer
      const contentType = res.headers.get('Content-type');
      let body;
      if (contentType.startsWith('application/json')) {
        body = res.body;

        // Handle User Messages

        if (body.userMessages && body.userMessages.length > 0) {
          const fatalMessages = body.userMessages.filter(
            userMessage => userMessage.severity === 1
          );
          const infoMessages = body.userMessages.filter(
            userMessage => userMessage.severity === 3
          );
          const warnMessages = body.userMessages.filter(
            userMessage => userMessage.severity === 2
          );

          if (fatalMessages.length > 0) {
            // clear these:
            environment.alerts = [];
            for (let i = 0; i < fatalMessages.length; i++) {
              const msgObj = fatalMessages[i];
              if (msgObj.fieldSpecificError !== true) {
                environment.alerts.push(msgObj.message);
              } else {
                const elem = document.getElementById(msgObj.errorFieldId);
                if (elem) {
                  const nd = BaseService.createMessageDiv('<span>' + msgObj.errorMessage + '</span>', 'err');
                  elem.appendChild(nd);
                } else {
                  environment.alerts.push(msgObj.message);
                }

                if (msgObj.highlightFieldIds) {
                  // Add border to fields to be highlighted
                  for (let j = 0; j < msgObj.highlightFieldIds.length; j++) {
                    const highlightElem = document.getElementById(msgObj.highlightFieldIds[j]);
                    if (highlightElem) {

                      let currCss = highlightElem.getAttribute('class');
                      if (!currCss) {
                        currCss = '';
                      }
                      if (currCss.indexOf('redBorder') === -1) {
                        highlightElem.setAttribute('class', 'redBorder uxHighlight ' + currCss);
                        highlightElem.setAttribute('origcss', currCss); // Backup to revert to
                      }
                    }
                  }
                }
              }
            }
          }
          if (infoMessages.length > 0) {
            environment.infoMessages = [];

            for (let i = 0; i < infoMessages.length; i++) {
              const msgObj = infoMessages[i];
              if (msgObj.fieldSpecificError !== true) {
                environment.infoMessages.push(msgObj.message);
              } else {
                const elem = document.getElementById(msgObj.errorFieldId);
                if (elem) {
                  const nd = BaseService.createMessageDiv('<span>' + msgObj.message + '</span>', 'info');
                  elem.appendChild(nd);

                  if (msgObj.highlightFieldIds) {
                    // Add border to fields to be highlighted
                    for (let j = 0; j < msgObj.highlightFieldIds; j++) {
                      const highlightElem = document.getElementById(msgObj.highlightFieldIds[j]);
                      if (highlightElem) {
                        let currCss = highlightElem.getAttribute('class');
                        if (!currCss) {
                          currCss = '';
                        }
                        if (currCss.indexOf('greenBorder') === -1) {
                          highlightElem.setAttribute('class', 'greenBorder uxHighlight ' + currCss);
                          highlightElem.setAttribute('origCss', currCss); // Backup to revert to
                        }
                      }
                    }
                  }
                } else {
                  environment.infoMessages.push(msgObj.message);
                }
              }
            }
          }
          if (warnMessages.length > 0) {
            environment.warnMessages = [];
            for (let i = 0; i < warnMessages.length; i++) {
              const msgObj = warnMessages[i];
              if (msgObj.fieldSpecificError !== true) {
                environment.warnMessages.push(msgObj.message);
              } else {
                const elem = document.getElementById(msgObj.errorFieldId);
                if (elem) {
                  const nd = BaseService.createMessageDiv('<span>' + msgObj.message + '</span>', 'warn');
                  elem.appendChild(nd);

                  if (msgObj.highlightFieldIds) {
                    // Add border to fields to be highlighted
                    for (let j = 0; j < msgObj.highlightFieldIds; j++) {
                      const highlightElem = document.getElementById(msgObj.highlightFieldIds[j]);
                      if (highlightElem) {
                        let currCss = highlightElem.getAttribute('class');
                        if (!currCss) {
                          currCss = '';
                        }
                        if (currCss.indexOf('orangeBorder') === -1) {
                          highlightElem.setAttribute('class', 'orangeBorder uxHighlight ' + currCss);
                          highlightElem.setAttribute('origCss', currCss); // Backup to revert to
                        }
                      }
                    }
                  }
                } else {
                  environment.warnMessages.push(msgObj.message);
                }
              }
            }
          }
          if (warnMessages.length === 0) {
            // Scroll top of the page
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
            });
          }

        }
        return body || {};
      } else {
        body = res.text();
        alert('Unexpected Response: ' + res.text());
      }
      return body || {};
    }
    return {};
  }

  protected http() {
    return this._http;
  }
  protected makeGetRequest(url: string, headers: HttpHeaders) {
    let fullUrl = url;
    if (!url.startsWith('http')) {
      fullUrl = environment.baseApiUrl + url;
    }
    const httpOptions = { headers: headers, withCredentials: false };
    return this._http.get(fullUrl, { headers: httpOptions.headers, observe: 'response', withCredentials: false });
  }

  protected makeGetRequestForFiles(url: string, headers: HttpHeaders) {
    let fullUrl = url;
    if (!url.startsWith('http')) {
      fullUrl = environment.baseApiUrl + url;
    }
    const httpOptions = { headers: headers, withCredentials: false };
    return this._http.get(fullUrl, { headers: httpOptions.headers, withCredentials: false, responseType: 'blob' });
  }
  protected makeGetRequestForDocuments(url: string, headers: HttpHeaders) {
    let fullUrl = url;
    if (!url.startsWith('http')) {
      fullUrl = environment.baseApiUrl + url;
    }
    const httpOptions = { headers: headers, withCredentials: true };
    return this._http.get(fullUrl, { headers: httpOptions.headers, withCredentials: true, responseType: 'arraybuffer' });
  }
  protected makePostRequest(url: string, body: any, headers: HttpHeaders) {
    let fullUrl = url;
    if (!url.startsWith('http')) {
      fullUrl = environment.baseApiUrl + url;
    }
    const httpOptions = { headers: headers, withCredentials: false };
    return this._http.post(fullUrl, body, { headers: httpOptions.headers, observe: 'response' });
  }

  protected makePostRequesForDocumentst(url: string, body: any, headers: HttpHeaders) {
    let fullUrl = url;
    if (!url.startsWith('http')) {
      fullUrl = environment.baseApiUrl + url;
    }
    const httpOptions = { headers: headers, withCredentials: false };
    return this._http.post(fullUrl, body, { observe: 'response' });
  }
  protected makePutRequest(url: string, body: any, headers: HttpHeaders) {

    let fullUrl = url;
    if (!url.startsWith('http')) {
      fullUrl = environment.baseApiUrl + url;
    }
    const httpOptions = { headers: headers, withCredentials: false };
    return this._http.put(fullUrl, body, { headers: httpOptions.headers, observe: 'response', withCredentials: false });
  }
  protected makeDeleteRequest(url: string, headers: HttpHeaders) {
    let fullUrl = url;
    if (!url.startsWith('http')) {
      fullUrl = environment.baseApiUrl + url;
    }
    const httpOptions = { headers: headers, withCredentials: false };
    return this._http.delete(fullUrl, httpOptions);
  }
  /*... Session Timeout ...*/
  public startSessionTimer() {

    environment.lastApiHitTimestamp = new Date().getTime();

    if (environment.isLoggedIn) {
      // Every 10 seconds, check if timeout warning has to be shown or not.
      environment.timeOutHandler = setInterval(() => { this.checkInactivity(); }, 10000) as any;
    }
  }

  private checkInactivity(): void {
    const now = new Date().getTime();
    // Check diff from current timestamp to the last api hit timestamp.
    // Any time a API hit is successful, environment.lastApiHitTimestamp is updated in extractData()
    const diff = now - environment.lastApiHitTimestamp;
    // This is the max of inactiveness of the API before warning has to be shown
    const maxInactive = environment.maxInactiveIntervalTime ? environment.maxInactiveIntervalTime : 1500 * 1000;

    if (diff >= maxInactive) {
      // Exceeds max inactive time, set indicator to show the warning. app.component.ts reads this variable and shows the warning.
      environment.showTimeoutWarning = true;
    } else {
      // Inactivity check shows there has been API hit activity. So no warning to show as of now.
      // Reset the indicator as false so that if a timer is currently being shown, it is removed.
      // Also, send a keep Alive if no keep alive has been sent in last 2 minutes, and API hit has happened in last two minutes or less
      environment.showTimeoutWarning = false;
      // If more than 2 minutes (keepAliveWindowMs) have passed since last keep alive, do a keep alive
      const keepAliveDiff = now - environment.lastKeepAliveTimestamp;
      // diff is the time from last API HIt, if it is within last two minutes, and keepalive diff is > 2 minutes
      if (diff <= environment.keepAliveWindowMs && keepAliveDiff >= environment.keepAliveWindowMs) {
        this.keepSessionAlive();
        environment.lastKeepAliveTimestamp = now;

      }

    }
  }
  keepSessionAlive() {
    if (window.location.href.indexOf('localhost') !== -1) {
      return;
    }
    // tslint:disable-next-line: deprecation
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options: any = { withCredentials: true, headers: headers };
    this.makeGetRequest('/AHCT/pingSession', options)
      .pipe(map((res) => {

        if (res.status === 500) {
          // alert("Unexpected Error: " + res.text());
        } else if (res.status >= 400 && res.status < 500) {
          alert('Unexpected Error: ' + res.statusText);
        } else if (res.status === 302) {

          const redir = res.headers.get('Location');
          if (redir && redir.indexOf('mhcauth') !== -1) {
            alert('Session has timed out!');
            window.location.href = '/';
          }
        } else if (res.status === 200) {
          const contentType = res.headers.get('Content-type');
          let body;
          if (contentType.startsWith('application/json')) {
            body = res.body;
            if (body.success) {
            } else {
              alert('Keep Alive Timeout Detected. Redirecting');
              window.location.href = '/';
            }
          }
        }

      })
      ).subscribe(
        // data => console.log(data),
        err => console.log(err)
      );
  }


  public logOut() {
    clearInterval(environment.timeOutHandler);
    clearInterval(environment.countdownHandler);
    environment.showTimeoutWarning = false;

    /*... redirect to /AHCT/DisplayLogout.action ...*/
    window.location.href = environment.baseWebRedirUrl + '/AHCT/DisplayLogout.action';

  }


  public secondsToTime(secs) {
    const minutes = Math.floor(secs / 60);
    let seconds: any = secs % 60;
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    const textTime = minutes > 0 ? minutes + ' minutes ' + seconds + ' seconds' : seconds + ' seconds';

    return textTime;
  }

  public refreshSessionTimer() {
    clearTimeout(environment.timeOutHandler);
    clearInterval(environment.countdownHandler); // stop the countdown showing seconds left in the modal
    environment.showTimeoutWarning = false; // Don't show the timeout warning now
    this.keepSessionAlive();
    environment.lastApiHitTimestamp = new Date().getTime(); // reset pageload timestamp
    this.startSessionTimer();

  }


  public getCookie(name) {
    return document.cookie.split('; ').reduce(function (memo, token) {
      let pair;
      if (memo) {
        // we've already a value, don't bother parsing further values
        return memo;
      }
      pair = token.split('=');
      if (pair[0] === name) {
        // return the decoded value as memoized value if the key matches
        return decodeURIComponent(pair[1]);
      }
    }, null);
  }



}
