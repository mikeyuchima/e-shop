//library
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';

//wrapper
import withData from '../lib/withData';

//components
import Page from '../components/Page';

class MyApp extends App {
  static async getInitialProps({ Component, context }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(context);
    }
    //this exposes query to user
    pageProps.query = context.query;
    return { pageProps };
  }

  render() {
    const { Component } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
