import React, { Component } from 'react';
import {Row,Col,Card,Container} from "shards-react";
import { Base64 } from 'js-base64';
import ViewerPdf from './viewerpdf.js';

class VerifyPdf extends Component {

    render() {
      const codeVerifyPdfX = Base64.decode(this.props.codeVerifyPdf)
      const ArrayIdValue2 = codeVerifyPdfX.split('>>>')
      const typeContract = ArrayIdValue2[0]
      const numberContract = ArrayIdValue2[1]
      const userOrigin = ArrayIdValue2[2]
      const whatUserRole = ArrayIdValue2[3]
      const description = ArrayIdValue2[4]
      return (
        <Container fluid className="main-content-container px-4" >
              <Row>&nbsp;</Row>
              <Row>
                <Col lg="2"></Col>
                <Col lg="8">
                  <Card small className="mb-4 pt-3">
                    <Row>&nbsp;</Row>
                    <Row>
                      <Col lg="1"></Col>
                      <Col lg="10">
                         <div>
                           <ViewerPdf typeContract={typeContract}
                                      numberContract={numberContract}
                                      userOrigin={userOrigin}
                                      whatUserRole={whatUserRole}
                                      description={description}
                                      username={this.props.userProfile}
                                      usernameX={this.props.userProfile} />
                         </div>
                      </Col>
                     <Col lg="1"></Col>
                    </Row>
                    <Row>&nbsp;</Row>
                  </Card>
                </Col>
                <Col lg="2"></Col>
              </Row>
              <Row>&nbsp;</Row>
        </Container>
      )
   }
}
export default VerifyPdf;
