import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { PrismCode } from 'react-prism';
import { Button, Container, Row, Col, Jumbotron } from 'reactstrap';
import VideoExample from '../examples/video-basic';
import AudioExample from '../examples/audio-basic';

// const importBasic = fs.readFileSync('../examples/import-basic', 'utf8');

export default class extends Component {
  static async getInitialProps ({ query }) {
    const response = await fetch('http://localhost:9000/code/video-basic.js');
    const importBasic = await response.text();
    return { importBasic };
  }

  render() {
    const { importBasic } = this.props;

    return (
      <div>
        <Head>
          <title>Video-React - React Video Component</title>
        </Head>
        <Jumbotron tag="section" className="jumbotron-header text-center mb-3">
          <Container>
            <Row>
              <Col>
                <p className="lead">
                  <img src="/static/logo.png" alt="" width="150px" />
                </p>
                <h1 className="jumbotron-heading display-4">Video-React</h1>
                <p className="lead">
                  The web video player built from the ground up for an HTML5 world using React library.
                </p>
                <p>
                  <Button outline color="danger" href="https://github.com/video-react/video-react">View on Github</Button>
                  <Link href="/components/">
                    <a className="btn btn-danger">View Components</a>
                  </Link>
                </p>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <Container fluid>
          <Row>
            <Col sm={{ size: 8, offset: 2 }}>
              <h2>Installation</h2>
              <hr />
              <h3>NPM</h3>
              <p>Install video-react and peer dependencies via NPM</p>
              <pre>
                <PrismCode className="language-bash">npm install --save video-react react react-dom redux</PrismCode>
              </pre>
              <h3>Basic example</h3>
              <p>The basic player</p>
              <div className="docs-example">
                <VideoExample />
              </div>
              <div className="docs-example">
                <AudioExample />
              </div>
              <p>import css in your app or add video-react styles in your page</p>
              <pre>
                <PrismCode className="language-jsx">
                  import "node_modules/video-react/dist/video-react.css"; // import css
                </PrismCode>
              </pre>
              <pre>
                <PrismCode className="language-jsx">
                  @import "~video-react/styles/scss/video-react"; // or import scss
                </PrismCode>
              </pre>
              <pre>
                <PrismCode className="language-html">
                  &lt;link rel="stylesheet" href="/css/video-react.css" /&gt;
                </PrismCode>
              </pre>
              <pre>
                <PrismCode className="language-jsx">
                  {importBasic}
                </PrismCode>
              </pre>

              <h2 className="m-t-3">Development</h2>
              <hr />
              <p>Install dependencies:</p>
              <pre>
                <PrismCode className="language-bash">npm install</PrismCode>
              </pre>
              <p>
              Run examples at <a href="http://localhost:9000/" target="_blank">http://localhost:9000/</a> with webpack dev server:
              </p>
              <pre>
                <PrismCode className="language-bash">npm start</PrismCode>
              </pre>
              <p>
                Run tests & coverage report:
              </p>
              <pre>
                <PrismCode className="language-bash">npm test</PrismCode>
              </pre>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};
