import React, { Component } from 'react';

//Axios
import axios from 'axios';

//Zonefile (Gaia)
import { parseZoneFile } from 'zone-file'

//CSS
import './viewerpdf.css'

//loader
import Loader from '../loader'

import { EditorState, convertFromRaw } from 'draft-js';

import { Base64 } from 'js-base64';

import MyDocument from "./generatepdf";
import {getTransactionRegister} from "./clarityfunctions"

const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

class ViewerPdf extends Component {

    constructor(props) {
        super(props);

        const contentState = convertFromRaw(content);
        this.state = {contentState, }
        const editorState = EditorState.createWithContent(contentState);
        this.state = { editorState, }

        this.state = {
          jsonBlockstackY: [],
          networkUrlX: '',
          trimmedDataURL: null,
          jsonBlockstackFormPago: [],
          originMoney: 'USD - US Dollar',
          symbolcurrency: 'USD',
          jsonHeadPaymentForm: [],
          cryptoCurrency: 'STX',
          saldodocumento: null,
          totaldocumento: '',
          contentStateRaw: null,
          filedecodeAttachX: {},
          fileAttachX: {},
          getTransaction: '',
          fullRead: false,
        }
    }

    UNSAFE_componentWillMount() {
      let networkUrlX = 'https://stacks-node-api.mainnet.stacks.co'
      Promise.all([
                   this.getAgreement(networkUrlX),
                   this.goSignListNames(this.props.typeContract,this.props.numberContract,this.props.userRole,this.props.userOrigin,networkUrlX),
                   this.getHeadPaymentFormsNames(networkUrlX),
                   this.getDetailPaymentFormsNames(networkUrlX),
                   this.getUploadedDetailNames(networkUrlX),
                   this.getTransactionRegisterNames(networkUrlX)
                 ])
        .then((resolve) =>{this.setState({fullRead: true})},(reject) =>{this.setState({fullRead: true})})
    }

    //-----------------------------------------------------------------------

    goSignListNames = (typeContract,numberContract,displayRole,userOrigin,networkUrlX) => {
      return new Promise ((resolve1, reject1) =>{
        var nameLookupURL = networkUrlX + "/v1/names/" + userOrigin;
        axios.get(nameLookupURL)
          .then(result => {
            //const zoneFileJson = parseZoneFile(result.data.zonefile)
            //const zonefile4 = zoneFileJson.uri[0].target

            const {zonefile} = result.data
            this.setState({stxAddress2X:result.data.address})
            const zonefile1 = zonefile.indexOf('"');
            const zonefile2 = zonefile.lastIndexOf('"');
            const zonefile3 = zonefile.substring(zonefile1+1,zonefile2)
            const zonefile4 = zonefile3.replace(/\\/g,'')

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
                  const getFile = storage + `${typeContract}_${numberContract}_usergroup.json`
                  axios.get(getFile)
                    .then(fileContents => {

                      //console.log('goSignListNames')
                      //console.log('then')
                      //console.log(fileContents)

                      if(fileContents) {
                        const jsonBlockstack1 = fileContents.data
                        this.setState({jsonBlockstackY: jsonBlockstack1})
                        //---------------------------------------------------------------------------------
                        this.goSignListRemotoNames(typeContract,numberContract,jsonBlockstack1,networkUrlX)
                        //---------------------------------------------------------------------------------
                        resolve1()
                      }
                    })
                    .catch(error => {

                      //console.log('goSignListNames')
                      //console.log('catch 1')
                      console.log(error)

                      //----------------------------------------------------------------------------------
                      this.goSignListRemotoNames(typeContract,numberContract,jsonBlockstack1,networkUrlX)
                      //----------------------------------------------------------------------------------
                      resolve1()
                    });
               })
               .catch(error => {
                 //console.log('goSignListNames')
                 //console.log('catch 2')
                 console.log(error)
                 reject1()
               });
            })
            .catch(error => {
              //console.log('goSignListNames')
              //console.log('catch 3')
              console.log(error)
              reject1()
            });
        });
    }

    goSignListRemotoNames = (typeContract,configurationContractNumber,jsonBlockstack4c,networkUrlX) => {
      return new Promise ((resolve3, reject3) =>{
        const largo = jsonBlockstack4c.length
        jsonBlockstack4c.map((todoUserRemote,keyUserRemote)=>{
          var nameLookupURL = networkUrlX + "/v1/names/" + todoUserRemote.id;
          axios.get(nameLookupURL)
            .then(result => {
              //const zoneFileJson = parseZoneFile(result.data.zonefile)
              //const zonefile4 = zoneFileJson.uri[0].target

              const {zonefile} = result.data
              this.setState({stxAddress2X:result.data.address})
              const zonefile1 = zonefile.indexOf('"');
              const zonefile2 = zonefile.lastIndexOf('"');
              const zonefile3 = zonefile.substring(zonefile1+1,zonefile2)
              const zonefile4 = zonefile3.replace(/\\/g,'')

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
                    const getFile = storage + `${typeContract}_${configurationContractNumber}_usergroup.json`
                    let jsonBlockstack4d = []
                    new Promise ((resolve3, reject3) =>{
                      axios.get(getFile)
                        .then(fileContents => {
                          //console.log('goSignListRemotoNames')
                          //console.log('then')
                          //console.log(fileContents)
                          if(fileContents) {
                               const jsonBlockstack1 = fileContents.data
                               jsonBlockstack4d = jsonBlockstack1
                               const {signature} = jsonBlockstack4d[0]
                               if (todoUserRemote.signature !== signature){
                                  todoUserRemote.signature = signature
                               }
                               //-----------------------------------------------------------------------------
                               this.getSignatureRemoto(todoUserRemote.id,jsonBlockstack4c,keyUserRemote,networkUrlX)
                               //-----------------------------------------------------------------------------

                          }
                        })
                        .catch(error => {
                          //console.log('goSignListRemotoNames')
                          //console.log('catch 1')
                          console.log(error)
                          //-----------------------------------------------------------------------------
                          this.getSignatureRemoto(todoUserRemote.id,jsonBlockstack4c,keyUserRemote,networkUrlX)
                          //-----------------------------------------------------------------------------
                        });
                    });
                 })
                 .catch(error => {
                   //console.log('goSignListRemotoNames')
                   //console.log('catch 2')
                   console.log(error)
                 });
              })
              .catch(error => {
                //console.log('goSignListRemotoNames')
                //console.log('catch 3')
                console.log(error)
            });
            if (keyUserRemote === largo - 1){
              this.setState({jsonBlockstackY: jsonBlockstack4c})
              resolve3()
            }
          });
        });
    }

    getSignatureRemoto(userX,jsonBlockstack4c,keyUserRemote,networkUrlX){
      return new Promise ((resolve5, reject5) =>{
        var nameLookupURL = networkUrlX + "/v1/names/" + userX;
        axios.get(nameLookupURL)
            .then(result => {
              //const zoneFileJson = parseZoneFile(result.data.zonefile)
              //const zonefile4 = zoneFileJson.uri[0].target

              const {zonefile} = result.data
              this.setState({stxAddress2X:result.data.address})
              const zonefile1 = zonefile.indexOf('"');
              const zonefile2 = zonefile.lastIndexOf('"');
              const zonefile3 = zonefile.substring(zonefile1+1,zonefile2)
              const zonefile4 = zonefile3.replace(/\\/g,'')

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
                    const getFile = storage + `signature.json`
                    new Promise ((resolve3, reject3) =>{
                      axios.get(getFile)
                        .then(fileContents => {
                          //console.log('getSignatureRemoto')
                          //console.log('then')
                          //console.log(fileContents)
                          if(fileContents) {
                             if (fileContents.data !== '[]' && fileContents.data !== ''){
                               const jsonBlockstack1 = fileContents.data
                               const jsonBlockstack2 = JSON.parse(jsonBlockstack1)
                               jsonBlockstack4c.map((todoUserRemote2,keyUserRemote2)=>{
                                 if (keyUserRemote2 === keyUserRemote){
                                   todoUserRemote2.signpad = jsonBlockstack2.signature
                                   todoUserRemote2.bsignpad = true
                                   this.setState({trimmedDataURL: jsonBlockstack4.signature})
                                 }
                               })
                               resolve5()
                             }else{
                               resolve5()
                             }
                          } else {
                             resolve5()
                          }
                        })
                        .catch(error => {
                          //console.log('getSignatureRemoto')
                          //console.log('catch 1')
                          console.log(error)
                          resolve5()
                        });
                    });
                 })
                 .catch(error => {
                   //console.log('getSignatureRemoto')
                   //console.log('catch 2')
                   console.log(error)
                   reject5()
                 });
              })
              .catch(error => {
                //console.log('getSignatureRemoto')
                //console.log('catch 3')
                console.log(error)
                reject5()
            });
          });
    }

    getDetailPaymentFormsNames = (networkUrlX) => {
      return new Promise ((resolve6, reject6) =>{
        var nameLookupURL = networkUrlX + "/v1/names/" + this.props.userOrigin;
        axios.get(nameLookupURL)
          .then(result => {
            //const zoneFileJson = parseZoneFile(result.data.zonefile)
            //const zonefile4 = zoneFileJson.uri[0].target

            const {zonefile} = result.data
            this.setState({stxAddress2X:result.data.address})
            const zonefile1 = zonefile.indexOf('"');
            const zonefile2 = zonefile.lastIndexOf('"');
            const zonefile3 = zonefile.substring(zonefile1+1,zonefile2)
            const zonefile4 = zonefile3.replace(/\\/g,'')

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
                  const getFile = storage + `${this.props.typeContract}_${this.props.numberContract}_detail_payment_form.json`
                  axios.get(getFile)
                    .then((fileContents) => {
                      //console.log('getDetailPaymentFormsNames')
                      //console.log('then')
                      //console.log(fileContents)
                      let jsonBlockstack1 = []
                      if(fileContents) {
                        jsonBlockstack1 = fileContents.data
                        if (Array.isArray(jsonBlockstack1)){
                            this.setState({jsonBlockstackFormPago: jsonBlockstack1})
                        }else{
                          let jsonBlockstack2 = fileContents.data
                          let jsonBlockstack3 = jsonBlockstack2.replace(/\\/g,"")
                          let jsonBlockstack4 = jsonBlockstack3
                          if (jsonBlockstack3.substring(0,1)==='"' || jsonBlockstack3.substring(0,1)==='[]') {
                             jsonBlockstack4 = jsonBlockstack3.substring(1,jsonBlockstack3.length - 1);
                          }
                          jsonBlockstack1 = JSON.parse(jsonBlockstack4)
                          this.setState({jsonBlockstackFormPago: jsonBlockstack1})
                        }
                      } else {
                        resolve6();
                      }
                    })
                    .catch(error => {
                      //console.log('getDetailPaymentFormsNames')
                      //console.log('catch 1')
                      console.log(error)
                      reject6()
                    });
               })
             .catch(error => {
               //console.log('getDetailPaymentFormsNames')
               //console.log('catch 2')
               console.log(error)
               reject6()
             });
          })
          .catch(error => {
            //console.log('getDetailPaymentFormsNames')
            //console.log('catch 3')
            console.log(error)
            reject6()
          });
      });
    }

    getHeadPaymentFormsNames = (networkUrlX) => {
      return new Promise ((resolve7, reject7) =>{
        var nameLookupURL = networkUrlX + "/v1/names/" + this.props.userOrigin;
        axios.get(nameLookupURL)
          .then(result => {
            //const zoneFileJson = parseZoneFile(result.data.zonefile)
            //const zonefile4 = zoneFileJson.uri[0].target

            const {zonefile} = result.data
            this.setState({stxAddress2X:result.data.address})
            const zonefile1 = zonefile.indexOf('"');
            const zonefile2 = zonefile.lastIndexOf('"');
            const zonefile3 = zonefile.substring(zonefile1+1,zonefile2)
            const zonefile4 = zonefile3.replace(/\\/g,'')

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
                  const getFile = storage + `${this.props.typeContract}_${this.props.numberContract}_head_payment_form.json`
                  axios.get(getFile)
                    .then((fileContents) => {
                      //console.log('getHeadPaymentFormsNames')
                      //console.log('then')
                      //console.log(fileContents)
                      if(fileContents) {
                        const jsonBlockstack1 = JSON.parse(fileContents.data)
                        this.setState({jsonHeadPaymentForm:jsonBlockstack1});
                        this.setState({cryptoCurrency:jsonBlockstack1[0].symbolcryptocurrency, originMoney:jsonBlockstack1[0].originMoney,  symbolcurrency:jsonBlockstack1[0].symbolcurrency, saldodocumento: parseFloat(jsonBlockstack1[0].amount), totaldocumento: jsonBlockstack1[0].amount})
                        resolve7();
                      } else {
                        resolve7();
                      }
                    })
                    .catch(error => {
                      //console.log('getHeadPaymentFormsNames')
                      //console.log('catch 1')
                      console.log(error)
                      reject7();
                    });
               })
             .catch(error => {
               //console.log('getHeadPaymentFormsNames')
               //console.log('catch 2')
               console.log(error)
               reject7()
             });
          })
          .catch(error => {
            //console.log('getHeadPaymentFormsNames')
            //console.log('catch 3')
            console.log(error)
            reject7()
          });
      });
    }

    getAgreement = (networkUrlX) => {
      return new Promise ((resolve8, reject8) =>{
        var nameLookupURL = networkUrlX + "/v1/names/" + this.props.userOrigin;
        axios.get(nameLookupURL)
          .then(result => {
            //const zoneFileJson = parseZoneFile(result.data.zonefile)
            //const zonefile4 = zoneFileJson.uri[0].target

            const {zonefile} = result.data
            this.setState({stxAddress2X:result.data.address})
            const zonefile1 = zonefile.indexOf('"');
            const zonefile2 = zonefile.lastIndexOf('"');
            const zonefile3 = zonefile.substring(zonefile1+1,zonefile2)
            const zonefile4 = zonefile3.replace(/\\/g,'')

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
                  const getFile = storage + `${this.props.typeContract}_${this.props.numberContract}_blankdetail.json`
                  axios.get(getFile)
                    .then((fileContents) => {
                      //console.log('getAgreement')
                      //console.log('then')
                      //console.log(fileContents)
                      if(fileContents) {
                        const fileContentsString = JSON.stringify(fileContents.data)
                        const contentState = convertFromRaw(JSON.parse(fileContentsString))
                        this.setState({contentState, contentStateRaw:fileContents.data, })
                        resolve8()
                      } else {
                        resolve8();
                      }
                    })
                    .catch(error => {
                      //console.log('getAgreement')
                      //console.log('catch 1')
                      console.log(error)
                      reject8();
                    });
               })
             .catch(error => {
               //console.log('getAgreement')
               //console.log('catch 2')
               console.log(error)
               reject8()
             });
          })
          .catch(error => {
            //console.log('getAgreement')
            //console.log('catch 3')
            console.log(error)
            reject8()
          });
      });
    }

    getUploadedDetailNames = (networkUrlX) => {
      return new Promise ((resolve9, reject9) =>{
        var nameLookupURL = networkUrlX + "/v1/names/" + this.props.userOrigin;
        axios.get(nameLookupURL)
          .then(result => {
            //const zoneFileJson = parseZoneFile(result.data.zonefile)
            //const zonefile4 = zoneFileJson.uri[0].target

            const {zonefile} = result.data
            this.setState({stxAddress2X:result.data.address})
            const zonefile1 = zonefile.indexOf('"');
            const zonefile2 = zonefile.lastIndexOf('"');
            const zonefile3 = zonefile.substring(zonefile1+1,zonefile2)
            const zonefile4 = zonefile3.replace(/\\/g,'')

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
                  const getFile = storage + `${this.props.typeContract}_${this.props.numberContract}_uploadeddetail.json`
                  axios.get(getFile)
                    .then((fileContents) => {
                      //console.log('getUploadedDetailNames')
                      //console.log('then')
                      //console.log(fileContents)
                      if(fileContents) {
                        const jsonBlockstack1 = fileContents.data.replace(/\\/g,"")
                        let jsonBlockstack3 = jsonBlockstack1
                        if (jsonBlockstack1.substring(0,1)==='"' || jsonBlockstack1.substring(0,1)==='[]') {
                           jsonBlockstack3 = jsonBlockstack1.substring(1,jsonBlockstack1.length - 1);
                        }
                        let jsonBlockstack4 = JSON.parse(jsonBlockstack3)
                        const file64 = jsonBlockstack4.file
                        const file = Base64.decode(file64);
                        this.setState({filedecodeAttachX: file, fileAttachX: file64 })
                        resolve9()
                      } else {
                          resolve9()
                      }
                    })
                    .catch(error => {
                      //console.log('getUploadedDetailNames')
                      //console.log('catch 1')
                      console.log(error)
                      reject9()
                    });
               })
             .catch(error => {
               //console.log('getUploadedDetailNames')
               //console.log('catch 2')
               console.log(error)
               reject9()
             });
          })
          .catch(error => {
            //console.log('getUploadedDetailNames')
            //console.log('catch 3')
            console.log(error)
            reject9()
          });
      });
    }

    getTransactionRegisterNames = (networkUrlX) => {
      return new Promise ((resolve10, reject10) =>{
        var nameLookupURL = networkUrlX + "/v1/names/" + this.props.userOrigin;
        let jsonBlockstack4 = []
        axios.get(nameLookupURL)
          .then(result => {
            //const zoneFileJson = parseZoneFile(result.data.zonefile)
            //const zonefile4 = zoneFileJson.uri[0].target

            const {zonefile} = result.data
            this.setState({stxAddress2X:result.data.address})
            const zonefile1 = zonefile.indexOf('"');
            const zonefile2 = zonefile.lastIndexOf('"');
            const zonefile3 = zonefile.substring(zonefile1+1,zonefile2)
            const zonefile4 = zonefile3.replace(/\\/g,'')

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
                  const getFile = storage + `${this.props.typeContract}_${this.props.numberContract}.json`
                  axios.get(getFile)
                    .then((fileContents) => {
                      //console.log('getTransactionRegisterNames')
                      //console.log('then')
                      //console.log(fileContents)
                      if(fileContents) {
                        const jsonBlockstack1 = JSON.parse(fileContents.data)
                        const txId = jsonBlockstack1.registerTxId
                        if (txId !== undefined){
                          if (txId !== null && txId !== '' ) {
                            getTransactionRegister(networkUrlX, txId)
                              .then(val => {
                                 this.setState({ getTransaction: val })
                              })
                          }
                        }
                        resolve10();
                      } else {
                        resolve10();
                      }
                    })
                    .catch(error => {
                      //console.log('getTransactionRegisterNames')
                      //console.log('catch 1')
                      console.log(error)
                      reject10();
                    });
               })
             .catch(error => {
               //console.log('getTransactionRegisterNames')
               //console.log('catch 2')
               console.log(error)
               reject10()
             });
          })
          .catch(error => {
            //console.log('getTransactionRegisterNames')
            //console.log('catch 3')
            console.log(error)
            reject10()
          });
      });
    }


    render() {
      let jsonBlockstack5X = false
      if (this.state.fullRead === true){
        if (this.state.jsonBlockstackY !== null){
          jsonBlockstack5X = true
        }
      }

      return (
        <>
        {jsonBlockstack5X ?
              <MyDocument contentState={this.state.contentStateRaw}
                          typeContract={this.props.typeContract}
                          numberContract={this.props.numberContract}
                          jsonBlockstackY={this.state.jsonBlockstackY}
                          description={this.props.description}
                          trimmedDataURL={this.state.trimmedDataURL}
                          jsonBlockstackFormPago={this.state.jsonBlockstackFormPago}
                          totaldocumento={this.state.totaldocumento}
                          originMoney={this.state.originMoney}
                          cryptoCurrency={this.state.cryptoCurrency}
                          symbolcurrency={this.state.symbolcurrency}
                          usernameX={this.props.username}
                          userOrigin={this.props.userOrigin}
                          filedecodeAttachX={this.state.filedecodeAttachX}
                          getTransaction={this.state.getTransaction}
                          language={this.props.language} />
        :
          <Loader />
        }
        </>
      )
   }
}
export default ViewerPdf;
