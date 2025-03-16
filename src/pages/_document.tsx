import Document, { Head, Html, Main, NextScript } from 'next/document';

import { siteConfig } from '@/config/siteConfig';

class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang={siteConfig.locale} className="light">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
