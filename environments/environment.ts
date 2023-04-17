// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
   /*... Variables for Session Timeout ...*/

   popUpDuration: 300, /**Duration for which the popup should be shown in seconds **/
   maxInactiveIntervalTime: 1000 * 1500, /**milliseconds*/
   isLoggedIn: true, /**indicates a logged in session is on**/
   timeOutHandler: 0, /**The setTimeout function handler**/
   countdownHandler: 0, /**The handler for showing the timeout countdown**/
   showTimeoutWarning: false, /**app.component.ts looks for this every second. If set, the timeout warning is shown with
 countdown from popupDuration value down to 0**/
   lastApiHitTimestamp: 0,    /** The timestamp at which the last API hit was made. This does not include keepAlive requests
 to keep AHCT Session active**/
   lastKeepAliveTimestamp: 0,  /** The timestamp at which the last keep alive was sent **/
   keepAliveWindowMs: 120000,  /** Every 120 seconds, if inactivity has not happened, do a keep alive request to /AHCT/pingSession **/

   /**Messages Display**/
   alerts: [],
   infoMessages: [],
   warnMessages: [],
   production: true,
   showTestData: true,
   idleSet: 30,
   idleTimeout: 30,
   envName: 'dev',
   // baseApiUrl: 'http://localhost:8080',
   baseAuthUrl: '',
   baseApiUrl: 'https://d1-slp-api.supremelifeplatform.com',
   mockService: false,
   addForgerockHeaders: true,
   baseWebRedirUrl: ''
};
