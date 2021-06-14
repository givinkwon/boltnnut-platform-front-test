import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet as StyledComponentSheets } from "styled-components";
import { ServerStyleSheets as MaterialUiServerStyleSheets } from "@material-ui/styles";

//import TagManager from 'react-gtm-module'

//const tagManagerArgs = {
//    gtmId: 'GTM-PWFPPZ5'
//}

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
  //setGoogleTags() {
  //  return {
  //    __html: `
  //      window.dataLayer = window.dataLayer || [];
  //      function gtag(){dataLayer.push(arguments);}
  //      gtag('js', new Date());
  //      gtag('config', 'UA-162026812-1');
  //    `
  //  };
  //}
  setAnalyticsApi() {
    return {
      __html: `
      console.log(1)
      // Replace with your client ID from the developer console.
      var CLIENT_ID ='392846125574-q1os3ihbrss3u4hj7gcvkjhk6at6g7dl.apps.googleusercontent.com'; // <-- 발급받은 Client ID 입력 
      // Set authorized scope.
      var SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];
      
      console.log(2)
      function authorize(test) {
          // Handles the authorization flow.
          //  should be false when invoked from the button click.
          // var useImmdiate = event ? false : true;
          // alert("RR");
          var authData = {
              client_id: CLIENT_ID,
              scope: SCOPES,
              immediate: false
          };

        //   var authData = {
        //     client_id: test,
        //     scope: SCOPES,
        //     immediate: false
        // };
          console.log(3)
          gapi.auth.authorize(authData, function (response) {
            console.log(4)
           console.log(response);
              var authButton = document.getElementById('auth-button');
              console.log(response);
              if (response.error) {
                   
                  authButton.hidden = false;
              }
              else {
                  authButton.hidden = true;
                  queryAccounts();
              }
          });
      }
      console.log(5)
      function queryAccounts() {
          // Load the Google Analytics client library.
          gapi.client.load('analytics', 'v3').then(function () {
     
              // Get a list of all Google Analytics accounts for this user
              gapi.client.analytics.management.accounts.list().then(handleAccounts);
          });
      }
     
      function handleAccounts(response) {
          // Handles the response from the accounts list method.
          if (response.result.items && response.result.items.length) {
              // Get the first Google Analytics account.
              var firstAccountId = response.result.items[0].id;
     
              // Query for properties.
              queryProperties(firstAccountId);
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
              'start-date': '2020-03-03',
              // ## 조회 마지막일자
              'end-date': '2021-06-11',
              // ##  -- 사용자, 신규 방문자, 세션, 이탈률, 평균세션시간(초), 페이지뷰 수, 세션당 페이지수, 사용자당 세션 수 
              'metrics': 'ga:users,ga:newUsers,ga:sessions,ga:bounceRate,ga:avgSessionDuration,ga:pageviews,ga:pageviewsPerSession,ga:sessionsPerUser',
              // ##  -- 소스 , 매체
              'dimensions': 'ga:source,ga:medium'
          })
          .then(function (response) {
              var formattedJson = JSON.stringify(response.result, null, 2);
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
  // async componentDidMount() {
  //   TagManager.initialize(tagManagerArgs)
  // }
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
        </Head>
        <body>
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
          <NextScript />
          {/* GA Settings
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-162026812-1"></script>
          <script dangerouslySetInnerHTML={this.setGoogleTags()} /> */}
          {/* Google Tag Manager */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PWFPPZ5');`,
            }}
            async
          ></script>
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
          <script dangerouslySetInnerHTML={this.setAnalyticsApi()} />
          {/* ㅌㅌㅌ */}
          {/* <script src="https://apis.google.com/js/client.js?onload=authorize"></script> */}

          {/* <button id="auth-button" onclick="authorize()">
            Authorize
          </button>
          <textarea cols="80" rows="20" id="query-output"></textarea> */}
          {/* ㅌㅌㅌ */}
        </body>
      </html>
    );
  }
}
