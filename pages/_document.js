import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet as StyledComponentSheets } from "styled-components";
import { ServerStyleSheets as MaterialUiServerStyleSheets } from "@material-ui/styles";

export default class MyDocument extends Document {
  static getInitialProps = async (ctx) => {
    const styledComponentSheet = new StyledComponentSheets();
    const materialUiSheets = new MaterialUiServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledComponentSheet.collectStyles(
              materialUiSheets.collect(<App {...props} />)
            ),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          <React.Fragment key="styles">
            {initialProps.styles}
            {materialUiSheets.getStyleElement()}
            {styledComponentSheet.getStyleElement()}
          </React.Fragment>,
        ],
      };
    } finally {
      styledComponentSheet.seal();
    }
  };

  setReportV4() {
    return {
      __html: `
      var VIEW_ID = '214568260';

      // Query the API and print the results to the page.
      function getUserActivity(m_userId) {
        gapi.client.request({
          path: '/v4/userActivity:search',
          // path: '/v4/user',
          root: 'https://analyticsreporting.googleapis.com/',
          method: 'POST',
          body: {
            // "type": "USER_ID_TYPE_UNSPECIFIED",
            "viewId": "214568260",
            "user": {
              "type":"CLIENT_ID",
              // "userId": "463218669.1623114407",
              "userId": m_userId,
            },
            "dateRange": {
              "startDate": "2021-06-07",
              "endDate": "2021-06-14",
            },
          }
        }).then(setUserActivity, console.log(''));
      }
    
      function batchGet() {
        gapi.client.request({
          path: '/v4/reports:batchGet',
          root: 'https://analyticsreporting.googleapis.com/',
          method: 'POST',
          body: {
            "reportRequests": [
              {
                "viewId": "214568260",
                "dateRanges": [
                  {
                    "startDate": "2021-06-07",
                    "endDate": "2021-06-16"
                  }
                ],
                "metrics": [
                  {
                    "expression": "ga:users"
                  }
                ],
                "dimensions": [
                  {
                    "name": "ga:dimension2"
                  }
                ]
              }
            ]
            },
        }).then(displayResults, console.log(''));
      }

      function displayResults(response) {
        // var formattedJson = JSON.stringify(response.result, null, 2);
        var formattedJson = response.result;
        // console.log(formattedJson.reports)
        console.log(formattedJson.reports[0].data.rows[0].dimensions);
        getUserActivity(formattedJson.reports[0].data.rows[0].dimensions[0]);
        // document.getElementById('query-output').value = formattedJson;
      }

      function setUserActivity(response) {
        // var formattedJson = JSON.stringify(response.result, null, 2);
        var formattedJson = response.result;
        console.log(formattedJson)
      }

     `,
    };
  }
  setAnalyticsApi() {
    return {
      __html: `
      console.log(1)
      // Replace with your client ID from the developer console.
      var CLIENT_ID ='392846125574-q1os3ihbrss3u4hj7gcvkjhk6at6g7dl.apps.googleusercontent.com'; // <-- 발급받은 Client ID 입력 
      // Set authorized scope.
      var SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];
      // https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A214568260&start-date=30daysAgo&end-date=yesterday&metrics=ga%3Ausers
      console.log(2)
      function authorize() {
          // Handles the authorization flow.
          //  should be false when invoked from the button click.
          // var useImmdiate = event ? false : true;
          // alert("RR");
          var authData = {
              client_id: CLIENT_ID,
              scope: SCOPES,
              immediate: false
          };

          console.log(3)
          gapi.auth.authorize(authData, function (response) {
            console.log(4)
            console.log(response);
              // var authButton = document.getElementById('auth-button');
              console.log(response);
              if (response.error) {
                    
                  // authButton.hidden = false;
              }
              else {
                  // authButton.hidden = true;
                  queryAccounts();
                  console.log(6);
              }
          });
      }
      
      function queryAccounts() {
        console.log('queryAccounts() called');
          // Load the Google Analytics client library.
          gapi.client.load('analytics', 'v3').then(function () {
      
              // Get a list of all Google Analytics accounts for this user
              gapi.client.analytics.management.accounts.list().then(handleAccounts);
              console.log(7);
          });
          
      }
      
      function handleAccounts(response) {
        console.log(response);
          // Handles the response from the accounts list method.
          if (response.result.items && response.result.items.length) {
              // Get the first Google Analytics account.
              var firstAccountId = response.result.items[0].id;
      
              // Query for properties.
              queryProperties(firstAccountId);
              console.log(8);
          } else {
              console.log('No accounts found for this user.');
          }
      }
      
      function queryProperties(accountId) {
          // Get a list of all the properties for the account.
          gapi.client.analytics.management.webproperties.list(
              { 'accountId': accountId })
            .then(handleProperties)
            .then(null, function (err) {
                // Log any errors.
                console.log(err);
            });
      }
      
      function handleProperties(response) {
          // Handles the response from the webproperties list method.
          if (response.result.items && response.result.items.length) {
      
              // Get the first Google Analytics account
              var firstAccountId = response.result.items[0].accountId;
      
              // Get the first property ID
              var firstPropertyId = response.result.items[0].id;
      
              // Query for Views (Profiles).
              queryProfiles(firstAccountId, firstPropertyId);
          } else {
              console.log('No properties found for this user.');
          }
      }
      
      function queryProfiles(accountId, propertyId) {
          // Get a list of all Views (Profiles) for the first property
          // of the first Account.
          gapi.client.analytics.management.profiles.list({
              'accountId': accountId,
              'webPropertyId': propertyId
          })
          .then(handleProfiles)
          .then(null, function (err) {
              // Log any errors.
              console.log(err);
          });
      }
      
      function handleProfiles(response) {
          // Handles the response from the profiles list method.
          if (response.result.items && response.result.items.length) {
              // Get the first View (Profile) ID.
              var firstProfileId = response.result.items[0].id;
              // Query the Core Reporting API.
              queryCoreReportingApi(firstProfileId);
      
          } else {
              console.log('No views (profiles) found for this user.');
          }
      }
      
      function queryCoreReportingApi(profileId) {
          // Query the Core Reporting API for the number sessions for
          // the past seven days.
          gapi.client.analytics.data.ga.get({
              'ids': 'ga:' + profileId,
              // ## 조회 시작일자
              'start-date': '2021-06-08',
              // ## 조회 마지막일자
              'end-date': '2021-06-16',
              // ##  -- 사용자, 신규 방문자, 세션, 이탈률, 평균세션시간(초), 페이지뷰 수, 세션당 페이지수, 사용자당 세션 수 
              'metrics': 'ga:users',
              // ##  -- 소스 , 매체
              'dimensions': 'ga:dimension2',
          })
          .then(function (response) {
              console.log("!@@@@");
              var formattedJson = JSON.stringify(response.result, null, 2);
              console.log(formattedJson);
              document.getElementById('query-output').value = formattedJson;
          })
          .then(null, function (err) {
              // Log any errors.
              console.log(err);
          });
      }
      // this.authorizeasd();
      // authorize();
      // a();
      // alert("F");
      `,
    };
  }
  setGoogleTags() {
    return {
      __html: `
      
      window.dataLayer = window.dataLayer || [];
      
      function gtag(){dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'UA-162026812-1', {
          'custom_map': {'dimension2': 'clientId' }
      } );

      function MyDataLayerPush(object){
        if(window.location.hostname!='localhost')
        {
          dataLayer.push({event:object.event});
        }
      }
      
     `,
    };
  }
  setChannelTalk() {
    return {
      __html: `
        (function() {
          var w = window;
          if (w.ChannelIO) {
            return (window.console.error || window.console.log || function(){})('ChannelIO script included twice.');
          }
          var d = window.document;
          var ch = function() {
            ch.c(arguments);
          };
          ch.q = [];
          ch.c = function(args) {
            ch.q.push(args);
          };
          w.ChannelIO = ch;
          function l() {
            if (w.ChannelIOInitialized) {
              return;
            }
            w.ChannelIOInitialized = true;
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
            s.charset = 'UTF-8';
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
          }
          if (document.readyState === 'complete') {
            l();
          } else if (window.attachEvent) {
            window.attachEvent('onload', l);
          } else {
            window.addEventListener('DOMContentLoaded', l, false);
            window.addEventListener('load', l, false);
          }
        })();
        ChannelIO('boot', {
          "pluginKey": "ec3d75f3-0b9e-4b01-a746-dfed77e31339"
        });
      `,
    };
  }

  setBeusable() {
    return {
      __html: `
        (function() {
          var w = window;
          var d = document;
          var a =  "//rum.beusable.net/script/b210623e173415u761/7c70969d52";
          w.__beusablerumclient__ = {
            load : function(src){
              var b = d.createElement("script");
              b.src = src; b.async=true; b.type = "text/javascript";
              d.getElementsByTagName("head")[0].appendChild(b);
            }
          };
          w.__beusablerumclient__.load(a);
      })();
      `,
    };
  }

  setBeusableAddition() {
    return {
      __html: `
        (function(w, d, a){
          w.__baclient__ = {
              load : function(src){
                  var b = d.createElement("script");
                  b.src = src; b.async=true; b.type = "text/javascript";
                  d.getElementsByTagName("head")[0].appendChild(b);
              }
          };w.__baclient__.load(a);
      })(window, document, "//ba.beusable.net/script/ba/c08687bf6b");
      `,
    };
  }
  render() {
    return (
      <html>
        <Head>
          <>
            {/* 구글 옵티마이저 설치태그 */}
            <script src="https://www.googleoptimize.com/optimize.js?id=OPT-56ZDC8G"></script>
            <script
              data-ad-client="ca-pub-6441704928060549"
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            ></script>

            {/* Beusable */}
            <script type="text/javascript"></script>
            <meta
              http-equiv="Content-Type"
              content="text/html; charset=utf-8"
            />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            {/*--PG크로스브라우징필수내용--*/}
            <meta http-equiv="Cache-Control" content="no-cache" />
            <meta http-equiv="Expires" content="0" />
            <meta http-equiv="Pragma" content="no-cache" />

            {/* 네이버웹마스터도구 사이트구조개선 코드*/}
            <meta name="NaverBot" content="All" />
            <meta name="NaverBot" content="index, follow" />
            <meta name="Yeti" content="All" />
            <meta name="Yeti" content="index, follow" />

            <meta
              name="google-signin-client_id"
              content="392846125574-q1os3ihbrss3u4hj7gcvkjhk6at6g7dl.apps.googleusercontent.com"
            ></meta>
            <meta
              name="google-signin-scope"
              content="https://www.googleapis.com/auth/analytics.readonly"
            ></meta>
            {/* 대표 URL */}
            <link rel="canonical" href="https://www.boltnnut.com/" />
            {/* Naver webmaster */}
            <meta
              name="naver-site-verification"
              content="4354dc20bc3fb28a16e1db9800acf406fd782d76"
            />
            {/* favicon */}
            <link
              rel="shortcut icon"
              href="C:\Users\user\boltnnut-platform-front\public\favicon.ico"
            />
            <link
              rel="shortcut icon"
              href="https://www.boltnnut.com/favicon.ico"
            />
            <link rel="shortcut icon" href="/public/favicon.ico" />
            <link
              rel="icon"
              href="C:\Users\user\boltnnut-platform-front\public\favicon.ico"
            />
            <link rel="icon" href="/public/favicon.ico" />
            <link
              href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:100,300,400,500,700,900|Noto+Sans:400,700&display=swap"
              rel="stylesheet"
            />
            <link
              rel="stylesheet"
              type="text/css"
              charset="UTF-8"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />
          </>
          {/* Google Tag Manager */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];w[l].push({
                  'gtm.start':new Date().getTime(),event:'gtm.js'
                });

                var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                
              })(window,document,'script','dataLayer','GTM-PWFPPZ5');`,
            }}
            async
          ></script>
        </Head>
        <body oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-PWFPPZ5"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
          <Main />
          <script dangerouslySetInnerHTML={this.setChannelTalk()} />
          <script dangerouslySetInnerHTML={this.setBeusable()} />
          <script dangerouslySetInnerHTML={this.setBeusableAddition()} />
          <NextScript />
          {/* GA Settings*/}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-162026812-1"
          ></script>
          <script dangerouslySetInnerHTML={this.setGoogleTags()} />

          {/* Iamport */}
          <script
            type="text/javascript"
            src="https://code.jquery.com/jquery-1.12.4.min.js"
            async
          ></script>
          <script
            type="text/javascript"
            src="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"
            async
          ></script>
          {/* Naver analic */}
          <script
            type="text/javascript"
            src="//wcs.naver.net/wcslog.js"
          ></script>
          {/* Google Adsense */}
          <script
            data-ad-client="ca-pub-6441704928060549"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></script>
          {/* 테스트 */}
          <script
            type="text/javascript"
            src="https://apis.google.com/js/client.js?onload=authorize"
          ></script>
          <script
            type="text/javascript"
            src="https://apis.google.com/js/client:platform.js"
          ></script>
          <script dangerouslySetInnerHTML={this.setReportV4()} />

          {/* <button id="auth-button" onclick="authorize()">
            Authorize
          </button> */}
          {/* <textarea cols="80" rows="20" id="query-output"></textarea> */}
          {/* ㅌㅌㅌ */}
          {/* <p class="g-signin2" data-onsuccess="batchGet"></p> */}
        </body>
      </html>
    );
  }
}
