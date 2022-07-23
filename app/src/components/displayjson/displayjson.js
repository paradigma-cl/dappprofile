import React from "react";
import {
  Row,
  Col,
  Card,
  Container
} from "shards-react";

import axios from 'axios';

import { parseZoneFile } from 'zone-file'

//loader
import Loader from '../loader'

//JWT
//import jwt from 'jsonwebtoken';
import jwt_decode from "jwt-decode";

//JSON Formatter
import JsonFormatter from 'react-json-formatter'

class DisplayJson extends React.Component {
  constructor() {
    super();

    this.state = {
      jsonBlockstack5: null,
    };
  }

  UNSAFE_componentWillMount() {
    Promise.all([this.readProfile(this.props.userProfile)])
       .then(() => {},() => {})
  }

  readProfile = (userX) => {
    return new Promise ((resolve1, reject1) =>{
      if (userX === undefined || userX === null || userX === ''){reject1()}
      var nameLookupURL = "https://stacks-node-api.mainnet.stacks.co/v1/names/" + userX;
      axios.get(nameLookupURL)
        .then(result => {
          const zoneFileJson = parseZoneFile(result.data.zonefile)
          const zonefile4 = zoneFileJson.uri[0].target
          axios.get(zonefile4)
             .then(result => {
                const jsonBlockstack1 = JSON.stringify(result.data[0].decodedToken.payload.claim.appsMeta)
                let jsonBlockstack2 = jsonBlockstack1
                let jsonBlockstack4 = {}
                if (window.location.origin === 'http://localhost:3000'){
                   jsonBlockstack2 = jsonBlockstack1.replace(`"http://localhost:3000":`,`"localhost":`);
                   const jsonBlockstack3 = JSON.parse(jsonBlockstack2)
                   jsonBlockstack4 = jsonBlockstack3.localhost
                }else{
                  jsonBlockstack2 = jsonBlockstack1.replace(`"https://xck.app":`,`"xckapp":`);
                  const jsonBlockstack3 = JSON.parse(jsonBlockstack2)
                  jsonBlockstack4 = jsonBlockstack3.xckapp
                }
                const {storage} = jsonBlockstack4
                const getFile = storage + `profile.json`
                axios.get(getFile)
                  .then((fileContents) => {
                  if(fileContents) {
                      const jwtToken = fileContents.data
                      const jwtDecoded = jwt_decode(jwtToken);
                      let jsonBlockstack5 = jwtDecoded[0]
                      this.setState({jsonBlockstack5: JSON.stringify(jsonBlockstack5)})
                      resolve1()
                    } else {
                      reject1()
                    }
                  })
                  .catch(error => {
                     console.log(error)
                     reject1()
                  });
             })
           .catch(error => {
             console.log(error)
             reject1()
           });
        })
        .catch(error => {
           console.log(error)
           reject1()
        });
    });
  }

  render() {
    let jsonBlockstack5X = false
    if (this.state.jsonBlockstack5 !== null){
      jsonBlockstack5X = true
    }

    const jsonStyle = {
        propertyStyle: { color: 'red' },
        stringStyle: { color: 'green' },
        numberStyle: { color: 'darkorange' }
      }

    return (
      <Container fluid className="main-content-container px-4" >
        {jsonBlockstack5X ?
          <>
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
                         <JsonFormatter json={this.state.jsonBlockstack5} tabWith={4} jsonStyle={jsonStyle} />
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
          </>
        :
          <Loader />
        }
      </Container>
    )
  }
};

export default DisplayJson;
