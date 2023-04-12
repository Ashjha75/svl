export const environment = {
  /*... Variables for Session Timeout ...*/

  popUpDuration: 300, /**Duration for which the popup should be shown in seconds - 5 minutes**/
  maxInactiveIntervalTime: 1000 * 600, /**milliseconds - 10 minutes*/
  isLoggedIn: true, /**indicates a logged in session is on**/
  timeOutHandler: 0, /**The setTimeout function handler**/
  countdownHandler: 0, /**The handler for showing the timeout countdown**/
  showTimeoutWarning: false, /**app.component.ts looks for this every second. If set, the timeout warning is shown with
  countdown from popupDuration value down to 0**/
  lastApiHitTimestamp: 0,    /** The timestamp at which the last API hit was made. This does not include keepAlive requests
  to keep AHCT Session active**/
  lastKeepAliveTimestamp: 0,  /** The timestamp at which the last keep alive was sent **/
  keepAliveWindowMs: 120000,  /** Every 120 seconds, if inactivity has not happened, do a keep alive request to /AHCT/pingSession **/


  isApiHit: false,
  production: true,
  showTestData: false,
  sessionTimeOutInterval: 0,
  IsPopupShowed: false,
  pageLoadTimestamp: 0,
  alerts: [],
  infoMessages: [],
  warnMessages: [],
  envName: '',
  idleSet: 30,
  idleTimeout: 30,
  addForgerockHeaders: true,
  baseAuthUrl: '',
  baseApiUrl: '',
  baseWebRedirUrl: ''
};
