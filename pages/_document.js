import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components'
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/styles'
//import TagManager from 'react-gtm-module'

//const tagManagerArgs = {
//    gtmId: 'GTM-PWFPPZ5'
//}

export default class MyDocument extends Document {
  static getInitialProps = async (ctx) => {
    const styledComponentSheet = new StyledComponentSheets()
    const materialUiSheets = new MaterialUiServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props =>
            styledComponentSheet.collectStyles(
              materialUiSheets.collect(<App {...props} />),
            ),
        })
      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [
          <React.Fragment key="styles">
            {initialProps.styles}
            {materialUiSheets.getStyleElement()}
            {styledComponentSheet.getStyleElement()}
          </React.Fragment>,
        ],
      }
    } finally {
      styledComponentSheet.seal()
    }
  }
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
      `
    }
  }
 // async componentDidMount() {
 //   TagManager.initialize(tagManagerArgs)
 // }

  render() {
    return (
      <html>
        <Head>
          {/* GA Settings
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-162026812-1"></script>
          <script dangerouslySetInnerHTML={this.setGoogleTags()} /> */}
          {/* Google Tag Manager */}
          <script dangerouslySetInnerHTML={{__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PWFPPZ5');`,}}></script>
          <meta name="naver-site-verification" content="12005c1a60612f3a3510070ec18a2d7a1553fcab"/>
          <meta charSet="utf-8" />
          {/* SEO */}
          <title>볼트앤너트</title>
          <meta property="og:title" content="볼트앤너트" />
          <meta property="og:description" content="제조 중개 매칭 플랫폼 볼트앤너트" />
          <meta name="description" content="제조 중개 매칭 플랫폼 볼트앤너트" />

          <meta property="og:image" content="/static/images/thumbnail.png"/>
          <link rel="icon" href="/static/favicon.ico" />
          <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:100,300,400,500,700,900|Noto+Sans:400,700&display=swap" rel="stylesheet" />
          <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
          {/* Iamport */}
          <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js" ></script>
          <script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"></script>
        </Head>
        <body>
          <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PWFPPZ5" height="0" width="0" style={{display : "none", visibility : "hidden"}}></iframe></noscript>
          <Main />
          <script dangerouslySetInnerHTML={this.setChannelTalk()} />
          <NextScript />
        </body>
      </html>
    );
  }
}
