import React from "react";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  FormTextarea,
  Container,
  FormCheckbox
} from "shards-react";

import { Table } from 'reactstrap';

import axios from 'axios';

import ReactImageFallback from "react-image-fallback";

import { FormattedMessage } from 'react-intl';

import { Base64 } from 'js-base64';

import { parseZoneFile } from 'zone-file'

//loader
import Loader from '../loader'

//JWT
//import jwt from 'jsonwebtoken';
import jwt_decode from "jwt-decode";
import * as jose from 'jose'


class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      jsonBlockstack4: [],
      avatar: '',
      stxAddress2X: '',
      btcAddress2X: '',
      bSmsScope: false,
      bEmailScope: false,
      bStxScope: false,
      bBtcScope: false,
      bWebSite: false,
      checkedMode: true,
      colorCard: "black",
      colorProfileName: "#ffffff",
      colorUserProfile: "#ff8000",
      colorClaim: "red",
      colorDescription: "#0d0d0d",
      colorLabelStxSddress: "#cccccc",
      colorLabelBtcSddress: "#cccccc",
      colorLabelEmail: "#cccccc",
      colorLabePhone: "#cccccc",
      colorStxSddress: "#ffffff",
      colorBtcSddress: "#ffffff",
      colorEmail: "#ffffff",
      colorPhone: "#ffffff",
      colorWordDescription: "#ffffff",
      colorPowered: "#595959",
      color404: "#ff8000",
      domainExists: true,
      perfilExists: true,
      bDomainLength: false,
      domainLength: 0,
      bFacebook: true,
      bTwitter: true,
      bYoutube: true,
      bLinkedin: true,
      bPinterest: true,
      bInstagram: true,
      background: '',
    };
  }

  componentDidMount() {
    Promise.all([this.readConfiguration(this.props.userProfile),
                 this.readProfile(this.props.userProfile)])
       .then(() => {},() => {})
  }

  handleChangeMode = (e,modeX) => {
    if (modeX === false){
       this.setState({
           colorCard: "black",
           colorProfileName: "#ffffff",
           colorUserProfile: "#ff8000",
           colorClaim: "red",
           colorDescription: "#0d0d0d",
           colorLabelStxSddress: "#cccccc",
           colorLabelBtcSddress: "#cccccc",
           colorLabelEmail: "#cccccc",
           colorLabePhone: "#cccccc",
           colorStxSddress: "#ffffff",
           colorBtcSddress: "#ffffff",
           colorEmail: "#ffffff",
           colorPhone: "#ffffff",
           colorWordDescription: "#ffffff",
           colorPowered: "#595959",
           color404: "#ff8000"})
    }else {
      this.setState({
          colorCard: "white",
          colorProfileName: "#660000",
          colorUserProfile: "#595959",
          colorClaim: "blue",
          colorDescription: "#F4F4F4",
          colorLabelStxSddress: "#595959",
          colorLabelBtcSddress: "#595959",
          colorLabelEmail: "#595959",
          colorLabePhone: "#595959",
          colorStxSddress: "#000066",
          colorBtcSddress: "#000066",
          colorEmail: "#000066",
          colorPhone: "#000066",
          colorWordDescription: "#000000",
          colorPowered: "#595959",
          color404: "#cccccc"})
    }
    this.setState({checkedMode: !modeX});
  }

  readProfile = (userX) => {
    return new Promise ((resolve1, reject1) =>{
      if (userX === undefined || userX === null || userX === ''){reject1()}
      var nameLookupURL = "https://stacks-node-api.mainnet.stacks.co/v1/names/" + userX;
      axios.get(nameLookupURL)
        .then(result => {
          this.setState({stxAddress2X:result.data.address})
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
                //const getFile = storage + `myUserConfig.json`
                axios.get(getFile)
                  .then((fileContents) => {
                    if(fileContents) {
                      const jwtToken = fileContents.data
                      const jwtPayload = jwtToken.split('.');
                      const jwtSignature = jwtPayload[2]
                      const jwtSignatureDecoded = Base64.decode(jwtSignature)

                      this.jwtJoseVerify(jwtToken,jwtSignatureDecoded)

                      const jwtDecoded = jwt_decode(jwtToken);

                      let jsonBlockstack4 = jwtDecoded[0].payload.claim
                      if (jsonBlockstack4.account[0].scope === undefined || jsonBlockstack4.account[0].scope === null || jsonBlockstack4.account[0].scope === 'undefined'){ jsonBlockstack4.account[0].scope = 'Private'}
                      if (jsonBlockstack4.account[1].scope === undefined || jsonBlockstack4.account[1].scope === null || jsonBlockstack4.account[1].scope === 'undefined'){ jsonBlockstack4.account[1].scope = 'Private'}
                      if (jsonBlockstack4.account[2].scope === undefined || jsonBlockstack4.account[2].scope === null || jsonBlockstack4.account[2].scope === 'undefined'){ jsonBlockstack4.account[2].scope = 'Private'}
                      if (jsonBlockstack4.account[3].scope === undefined || jsonBlockstack4.account[3].scope === null || jsonBlockstack4.account[3].scope === 'undefined'){ jsonBlockstack4.account[3].scope = 'Private'}
                      if (jsonBlockstack4.account[1].smsCountry === undefined || jsonBlockstack4.account[1].smsCountry === null || jsonBlockstack4.account[1].smsCountry === 'undefined'){ jsonBlockstack4.account[1].smsCountry = 'United States'}
                      if (jsonBlockstack4.account[1].smsPrefix === undefined || jsonBlockstack4.account[1].smsPrefix === null || jsonBlockstack4.account[1].smsPrefix === 'undefined'){ jsonBlockstack4.account[1].smsPrefix = '+1'}

                      if (jsonBlockstack4.web === undefined || jsonBlockstack4.web === null || jsonBlockstack4.web === 'undefined'){ jsonBlockstack4.web = ''}

                      this.setState({avatar:Base64.decode(jsonBlockstack4.avatar)})

                      if(jsonBlockstack4.account[0].scope === 'Public'){this.setState({bEmailScope:true})}else{this.setState({bEmailScope:false})}
                      if(jsonBlockstack4.account[1].scope === 'Public'){this.setState({bSmsScope:true})}else{this.setState({bSmsScope:false})}
                      if(jsonBlockstack4.account[2].scope === 'Public'){this.setState({bBtcScope:true})}else{this.setState({bBtcScope:false})}
                      if(jsonBlockstack4.account[3].scope === 'Public'){this.setState({bStxScope:true})}else{this.setState({bStxScope:false})}

                      if(jsonBlockstack4.web === ''){this.setState({bWebSite:false})}else{this.setState({bWebSite:true})}

                      if (jsonBlockstack4.account[4].proofUrl === undefined || jsonBlockstack4.account[4].proofUrl === null || jsonBlockstack4.account[4].proofUrl === 'undefined' || jsonBlockstack4.account[4].proofUrl === ''){this.setState({bFacebook: false})}
                      if (jsonBlockstack4.account[5].proofUrl === undefined || jsonBlockstack4.account[5].proofUrl === null || jsonBlockstack4.account[5].proofUrl === 'undefined' || jsonBlockstack4.account[5].proofUrl === ''){this.setState({bTwitter: false})}
                      if (jsonBlockstack4.account[6].proofUrl === undefined || jsonBlockstack4.account[6].proofUrl === null || jsonBlockstack4.account[6].proofUrl === 'undefined' || jsonBlockstack4.account[6].proofUrl === ''){this.setState({bYoutube: false})}
                      if (jsonBlockstack4.account[7].proofUrl === undefined || jsonBlockstack4.account[7].proofUrl === null || jsonBlockstack4.account[7].proofUrl === 'undefined' || jsonBlockstack4.account[7].proofUrl === ''){this.setState({bInstagram: false})}
                      if (jsonBlockstack4.account[8].proofUrl === undefined || jsonBlockstack4.account[8].proofUrl === null || jsonBlockstack4.account[8].proofUrl === 'undefined' || jsonBlockstack4.account[8].proofUrl === ''){this.setState({bLinkedin: false})}
                      if (jsonBlockstack4.account[9].proofUrl === undefined || jsonBlockstack4.account[9].proofUrl === null || jsonBlockstack4.account[9].proofUrl === 'undefined' || jsonBlockstack4.account[9].proofUrl === ''){this.setState({bPinterest: false})}

                      this.setState({jsonBlockstack4, domainExists: true, perfilExists: true, domainLength: this.props.userProfile.length, bDomainLength: true})

                      resolve1()
                    } else {
                      this.setState({domainExists: true, perfilExists: false, domainLength: this.props.userProfile.length, bDomainLength: true})
                      reject1()
                    }
                  })
                  .catch(error => {
                     console.log(error)
                     this.setState({domainExists: true, perfilExists: false, domainLength: this.props.userProfile.length, bDomainLength: true})
                     reject1()
                  });
             })
           .catch(error => {
             console.log(error)
             this.setState({domainExists: false, perfilExists: false, domainLength: this.props.userProfile.length, bDomainLength: true})
             reject1()
           });
        })
        .catch(error => {
           console.log(error)
           this.setState({domainExists: false, perfilExists: false, domainLength: this.props.userProfile.length, bDomainLength: true})
           reject1()
        });
    });
  }

  jwtJoseVerify = async (jwtToken,jwtSignatureDecoded) => {
    const { payload, protectedHeader } = await jose.jwtVerify(jwtToken, jwtSignatureDecoded)
    console.log(protectedHeader)
    console.log(payload)
  }

  readConfiguration = (userX) => {
    return new Promise ((resolve1, reject1) =>{
      if (userX === undefined || userX === null || userX === ''){reject1()}
      var nameLookupURL = "https://stacks-node-api.mainnet.stacks.co/v1/names/" + userX;
      axios.get(nameLookupURL)
        .then(result => {
          this.setState({stxAddress2X:result.data.address})
          const zoneFileJson = parseZoneFile(result.data.zonefile)
          const zonefile4 = zoneFileJson.uri[0].target
          let e=''
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
                const getFile = storage + `themeprofile.json`
                axios.get(getFile)
                  .then((fileContents) => {
                    if(fileContents) {
                      const jsonBlockstack1 = fileContents.data.replace(/\\/g,"")
                      let jsonBlockstack3 = jsonBlockstack1
                      if (jsonBlockstack1.substring(0,1)==='"') {
                         jsonBlockstack3 = jsonBlockstack1.substring(1,jsonBlockstack1.length - 1);
                      }
                      const jsonBlockstack4 = JSON.parse(jsonBlockstack3)

                      this.setState({ background: Base64.decode(jsonBlockstack4.background) });
                      if (jsonBlockstack4.mode === 'Light'){
                        this.setState({
                            colorCard: "white",
                            colorProfileName: "#660000",
                            colorUserProfile: "#595959",
                            colorClaim: "blue",
                            colorDescription: "#F4F4F4",
                            colorLabelStxSddress: "#595959",
                            colorLabelBtcSddress: "#595959",
                            colorLabelEmail: "#595959",
                            colorLabePhone: "#595959",
                            colorStxSddress: "#000066",
                            colorBtcSddress: "#000066",
                            colorEmail: "#000066",
                            colorPhone: "#000066",
                            colorWordDescription: "#000000",
                            colorPowered: "#595959",
                            color404: "#cccccc"})
                      }
                      resolve1()
                    } else {
                      resolve1()
                    }
                  })
                  .catch(error => {
                     console.log(error)
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

    const avatar2 = 'images/avatar.png'
    let urlImg = 'images/background_profile.png'
    if (this.state.backgound !== ''){
       urlImg = this.state.background
    }

    return (
      <div id="profile" style={{backgroundImage: `url(${urlImg})`, backgroundAttachment: 'fixed', overflow: 'auto', position: 'absolute', width: '100%',	height: '100%'}}>
        <Container fluid className="main-content-container px-4" >
          { this.state.bDomainLength ?
            <>
              <Row>&nbsp;</Row>
              <Row>
                <Col lg="2"></Col>
                <Col lg="8">
                  <Card small className="mb-4 pt-3" style={{ backgroundColor: this.state.colorCard }}>
                    { this.state.domainExists ?
                      <>
                      {this.state.perfilExists ?
                        <>
                          <CardHeader className="border-bottom text-center" style={{ backgroundColor: this.state.colorCard }}>
                            <Table size="sm" className="text-center" responsive borderless>
                                <tbody>
                                  <tr>
                                    <td>
                                      <div className="mb-3 mx-auto">
                                          <ReactImageFallback
                                               src={this.state.avatar}
                                               fallbackImage={avatar2}
                                               initialImage={avatar2}
                                               alt={" "}
                                               className="rounded-circle"
                                               width="120"
                                          />
                                      </div>
                                    </td>
                                  </tr>
                                  <tr><td style={{fontSize:40, color: this.state.colorProfileName}}><strong>{this.state.jsonBlockstack4.name}</strong></td></tr>
                                  <tr><td style={{fontSize:18, color: this.state.colorUserProfile}}><span className="text-muted d-block mb-2">{this.props.userProfile}</span></td></tr>
                               </tbody>
                            </Table>
                          </CardHeader>
                          <ListGroup flush>
                            <ListGroupItem className="p-4 text-center" style={{ backgroundColor: this.state.colorCard }}>
                              <Row>
                                <Col lg="1"></Col>
                                <Col lg="10">
                                  <Table size="sm" className="text-center" responsive borderless>
                                      <tbody>
                                        <tr><td style={{fontSize:12, color: this.state.colorLabelEmail}}>Short Description</td></tr>
                                        <tr>
                                          <td style={{ width: "90%" }}>
                                              <FormTextarea
                                                id="feMessage"
                                                rows="3"
                                                innerRef={this.state.jsonBlockstack4.description}
                                                style={{backgroundColor:this.state.colorDescription, color:this.state.colorWordDescription, fontSize:18}}
                                                placeholder={this.state.jsonBlockstack4.description}
                                                disabled={true}
                                              />
                                          </td>
                                        </tr>
                                     </tbody>
                                  </Table>
                                </Col>
                                <Col lg="1"></Col>
                              </Row>
                              {this.state.bWebSite ?
                                <Row>
                                  <Col lg="2"></Col>
                                  <Col lg="8">
                                    <Table size="sm" className="text-center" responsive borderless>
                                        <tbody>
                                          <tr><td style={{fontSize:12, color: this.state.colorLabelEmail}}>URL Website</td></tr>
                                          <tr><td style={{fontSize:24, color: this.state.colorEmail}}><a href={this.state.jsonBlockstack4.web} target="_blank" rel="noopener noreferrer">{this.state.jsonBlockstack4.web}</a></td></tr>
                                        </tbody>
                                    </Table>
                                  </Col>
                                  <Col lg="2"></Col>
                                </Row>
                              :
                                null
                              }
                              <Row>
                                <Col lg="2"></Col>
                                <Col lg="8">
                                  <Table size="sm" className="text-center" responsive borderless>
                                      <tbody>
                                        <tr><td className="text-center" style={{fontSize:12, color: this.state.colorLabelEmail}}>Social Networks</td></tr>
                                      </tbody>
                                  </Table>
                                  <Table size="sm" className="text-center" responsive borderless>
                                      <tbody>
                                        <tr>
                                          { this.state.bFacebook ?
                                             <td style={{ width: "17%" }}><a href={this.state.jsonBlockstack4.account[4].proofUrl} target="_blank" rel="noopener noreferrer"><img src="images/profile_facebook.png" weight="80" height="80" alt=""/></a></td>
                                          : null }
                                          { this.state.bTwitter ?
                                             <td style={{ width: "17%" }}><a href={this.state.jsonBlockstack4.account[5].proofUrl} target="_blank" rel="noopener noreferrer"><img src="images/profile_twitter.png" weight="80" height="80" alt=""/></a></td>
                                          : null }
                                          { this.state.bYoutube ?
                                             <td style={{ width: "17%" }}><a href={this.state.jsonBlockstack4.account[6].proofUrl} target="_blank" rel="noopener noreferrer"><img src="images/profile_youtube.png" weight="80" height="80" alt=""/></a></td>
                                          : null }
                                          { this.state.bInstagram ?
                                             <td style={{ width: "17%" }}><a href={this.state.jsonBlockstack4.account[7].proofUrl} target="_blank" rel="noopener noreferrer"><img src="images/profile_instagram.png" weight="80" height="80" alt=""/></a></td>
                                          : null }
                                          { this.state.bLinkedin ?
                                             <td style={{ width: "17%" }}><a href={this.state.jsonBlockstack4.account[8].proofUrl} target="_blank" rel="noopener noreferrer"><img src="images/profile_linkedin.png" weight="80" height="80" alt=""/></a></td>
                                          : null }
                                          { this.state.bPinterest ?
                                             <td style={{ width: "15%" }}><a href={this.state.jsonBlockstack4.account[9].proofUrl} target="_blank" rel="noopener noreferrer"><img src="images/profile_pinterest.png" weight="80" height="80" alt=""/></a></td>
                                          : null }
                                        </tr>
                                      </tbody>
                                  </Table>
                                </Col>
                                <Col lg="2"></Col>
                              </Row>
                            </ListGroupItem>
                          </ListGroup>
                          <ListGroup flush>
                            <ListGroupItem className="p-4 text-center" style={{ backgroundColor: this.state.colorCard }}>
                              <Row>
                                <Table size="sm" className="text-center" responsive borderless style={{fontSize:13}}>
                                    <tbody>
                                      {this.state.bStxScope ?
                                         <>
                                          <tr><td style={{fontSize:12, color: this.state.colorLabelStxSddress}}>STX Address</td></tr>
                                          <tr><td style={{fontSize:24, color: this.state.colorStxSddress}}><strong>{this.state.stxAddress2X}</strong></td></tr>
                                        </>
                                      :
                                        null
                                      }
                                      {this.state.bBtcScope ?
                                         <>
                                          <tr><td style={{fontSize:12, color: this.state.colorLabelBtcSddress}}>BTC Address</td></tr>
                                          <tr><td style={{fontSize:24, color: this.state.colorBtcSddress}}><strong>{this.state.jsonBlockstack4.account[2].identifier}</strong></td></tr>
                                        </>
                                      :
                                        null
                                      }
                                      {this.state.bEmailScope ?
                                        <>
                                          <tr><td style={{fontSize:12, color: this.state.colorLabelEmail}}>eMail</td></tr>
                                          <tr><td style={{fontSize:24, color: this.state.colorEmail}}><strong>{this.state.jsonBlockstack4.account[0].identifier}</strong></td></tr>
                                        </>
                                      :
                                         null
                                      }
                                      {this.state.bSmsScope ?
                                         <>
                                           <tr><td style={{fontSize:12, color: this.state.colorLabelStxSddress}}>Phone</td></tr>
                                           <tr><td style={{fontSize:24, color: this.state.colorPhone}}><strong>{`${this.state.jsonBlockstack4.account[1].smsPrefix}${this.state.jsonBlockstack4.account[1].identifier}`}</strong></td></tr>
                                         </>
                                      :
                                         null
                                      }
                                      <tr><td style={{fontSize:12, color: this.state.colorLabelStxSddress}}>did:web</td></tr>
                                      <tr><td style={{fontSize:24, color: this.state.colorPhone}}><strong>{`${this.state.jsonBlockstack4.account[10].identifier}`}</strong></td></tr>

                                   </tbody>
                                </Table>
                              </Row>
                            </ListGroupItem>
                          </ListGroup>
                          <ListGroup flush>
                            <ListGroupItem className="p-4" style={{ backgroundColor: this.state.colorCard }}>
                              <Row>
                                <Col lg="2"></Col>
                                <Col lg="8">
                                   <div className="text-center" style={{fontSize:22, color: this.state.colorClaim}}><a href="https://xck.app" target="_blank" rel="noopener noreferrer"><FormattedMessage id="profile.claim" /></a></div>
                                </Col>
                                <Col lg="2"></Col>
                              </Row>
                              <Row></Row>
                              <Row>
                                <Col lg="2"></Col>
                                <Col lg="8">
                                   <div className="text-center" style={{fontSize:22, color: this.state.colorClaim2}}><a href="https://domains.paradigma.global/" target="_blank" rel="noopener noreferrer"><FormattedMessage id="profile.claim2" /></a></div>
                                </Col>
                                <Col lg="2"></Col>
                              </Row>
                            </ListGroupItem>
                          </ListGroup>
                          <ListGroup flush>
                            <ListGroupItem className="p-4" style={{ backgroundColor: this.state.colorCard }}>
                              <Row>
                                <Col lg="2"></Col>
                                <Col lg="8">
                                   <div className="text-center" style={{fontSize:13, color: this.state.colorPowered}}>Powered by <a href="https://paradigma.global" target="_blank" rel="noopener noreferrer">Paradigma</a> with <a href="https://bitcoin.org/" target="_blank" rel="noopener noreferrer">Bitcoin</a> and <a href="https://stacks.co" target="_blank" rel="noopener noreferrer">Stacks</a> Blockchain Technology </div>
                                </Col>
                                <Col lg="2">
                                  <FormCheckbox
                                    toggle
                                    checked={this.state.checkedMode}
                                    onChange={e=>this.handleChangeMode(e,this.state.checkedMode)}>
                                       Mode
                                  </FormCheckbox>
                                </Col>
                              </Row>
                            </ListGroupItem>
                          </ListGroup>
                        </>
                      :
                        <>
                          <Row>&nbsp;</Row>
                          <Row>&nbsp;</Row>
                          <Row>&nbsp;</Row>
                          <Row>
                            <Col lg="2"></Col>
                            <Col lg="8">
                              <Table size="sm" borderless responsive className="text-center">
                                  <tbody>
                                    <tr>
                                      <td style={{ width: "100%", fontSize:30, color: this.state.color404 }}><FormattedMessage id="profile.profilenotfound" /></td>
                                    </tr>
                                  </tbody>
                              </Table>
                            </Col>
                            <Col lg="2"></Col>
                          </Row>
                          <Row>&nbsp;</Row>
                          <Row>&nbsp;</Row>
                          <Row>&nbsp;</Row>
                          <Row>&nbsp;</Row>
                          <Row>
                            <Col lg="2"></Col>
                            <Col lg="8">
                               <Table size="sm" borderless responsive className="text-center">
                                  <tbody>
                                    <tr>
                                      <td style={{ width: "50%" }}><a href={'https://domains.paradigma.global'} target="_blank" rel="noopener noreferrer"><img src="images/domains.svg" weight="90" height="90" alt=""/></a></td>
                                      <td style={{ width: "50%" }}><a href={'https://xck.app'} target="_blank" rel="noopener noreferrer"><img src="images/crosscheck.svg" weight="90" height="90" alt=""/></a></td>
                                    </tr>
                                    <tr>
                                      <td style={{ width: "50%", fontSize:17, color: this.state.color404 }}>Domains</td>
                                      <td style={{ width: "50%", fontSize:17, color: this.state.color404 }}>Crosscheck</td>
                                    </tr>
                                  </tbody>
                              </Table>
                            </Col>
                            <Col lg="2"></Col>
                          </Row>
                          <Row>&nbsp;</Row>
                          <Row>
                            <Col lg="2"></Col>
                            <Col lg="8">
                               <div className="text-center" style={{fontSize:13, color: this.state.colorPowered}}>Powered by <a href="https://paradigma.global" target="_blank" rel="noopener noreferrer">Paradigma</a> with <a href="https://bitcoin.org/" target="_blank" rel="noopener noreferrer">Bitcoin</a> and <a href="https://stacks.co" target="_blank" rel="noopener noreferrer">Stacks</a> Blockchain Technology </div>
                            </Col>
                            <Col lg="2"></Col>
                          </Row>
                          <Row>&nbsp;</Row>
                          <Row>&nbsp;</Row>
                        </>
                      }
                      </>
                    :
                      <>
                        <Row>&nbsp;</Row>
                        <Row>&nbsp;</Row>
                        <Row>&nbsp;</Row>
                        <Row>
                          <Col lg="2"></Col>
                          <Col lg="8">
                            <Table size="sm" borderless responsive className="text-center">
                                <tbody>
                                  <tr>
                                    <td style={{ width: "100%" }}><img src="images/page-not-found-404.png" weight="150" height="150" alt=""/></td>
                                  </tr>
                                  <tr>
                                    <td style={{ width: "100%", fontSize:30, color: this.state.color404 }}><FormattedMessage id="profile.domainnotfound" /></td>
                                  </tr>
                                </tbody>
                            </Table>
                          </Col>
                          <Col lg="2"></Col>
                        </Row>
                        <Row>&nbsp;</Row>
                        <Row>&nbsp;</Row>
                        <Row>&nbsp;</Row>
                        <Row>&nbsp;</Row>
                        <Row>
                          <Col lg="2"></Col>
                          <Col lg="8">
                             <Table size="sm" borderless responsive className="text-center">
                                <tbody>
                                  <tr>
                                    <td style={{ width: "50%" }}><a href={'https://domains.paradigma.global'} target="_blank" rel="noopener noreferrer"><img src="images/domains.svg" weight="90" height="90" alt=""/></a></td>
                                    <td style={{ width: "50%" }}><a href={'https://xck.app'} target="_blank" rel="noopener noreferrer"><img src="images/crosscheck.svg" weight="90" height="90" alt=""/></a></td>
                                  </tr>
                                  <tr>
                                    <td style={{ width: "50%", fontSize:17, color: this.state.color404 }}>Domains</td>
                                    <td style={{ width: "50%", fontSize:17, color: this.state.color404 }}>Crosscheck</td>
                                  </tr>
                                </tbody>
                            </Table>
                          </Col>
                          <Col lg="2"></Col>
                        </Row>
                        <Row>&nbsp;</Row>
                        <Row>
                          <Col lg="2"></Col>
                          <Col lg="8">
                             <div className="text-center" style={{fontSize:13, color: this.state.colorPowered}}>Powered by <a href="https://paradigma.global" target="_blank" rel="noopener noreferrer">Paradigma</a> with <a href="https://bitcoin.org/" target="_blank" rel="noopener noreferrer">Bitcoin</a> and <a href="https://stacks.co" target="_blank" rel="noopener noreferrer">Stacks</a> Blockchain Technology </div>
                          </Col>
                          <Col lg="2"></Col>
                        </Row>
                        <Row>&nbsp;</Row>
                        <Row>&nbsp;</Row>
                      </>
                    }
                  </Card>
                </Col>
                <Col lg="2"></Col>
              </Row>
            </>
          :
            <Loader />
          }
        </Container>
      </div>
    )
  }
};

export default Profile;
