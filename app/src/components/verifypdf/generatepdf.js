import React, { Component } from 'react';
import {Container, Card, Row, Col } from "shards-react";
import { Table } from 'reactstrap';
import MyViewerPdf from './myviewerpdf';
import { FormattedMessage } from 'react-intl';
import grey from "@material-ui/core/colors/grey";
import Home from '@material-ui/icons/Home';
import Facebook from '@material-ui/icons/Facebook';
import Twitter from '@material-ui/icons/Twitter';
import YouTube from '@material-ui/icons/YouTube';

class MyDocument extends Component {

    constructor(props) {
        super(props);

        this.state = {
          languageX: 'English',
        }
    }

    render() {
      let paymentFormX = 'Payment Form'
      let signatoriesX = 'Signatories'
      let signatureX = 'Signature'
      let nameX = 'Name'
      let titleX = "Agreement Document"
      let itemX = "Item"
      let conceptX = "Concept"
      let estimatedDateX = "Estimated Date"
      let percentX = "Percent"
      let amountX = "Amount"
      let docVerifyX = "Agreement Document Verification"
      let docNumberX = "Crosscheck Id"
      let docAsuntoX = "Subject"
      let digitallysignedX = 'Digitally signed by '
      let withdateX = 'With date '
      let totalsX = 'Totals'
      let registrationX = 'Blockchain Registration'
      let suscritoX = 'Document signed by digital signature'
      let paymentForm1X = 'The total amount of this agreement is'
      let paymentForm2X = 'and will be paid in'
      let paymentForm3X = 'at the exchange rate at the time of payment'
      if (this.props.language === 'en'){ paymentFormX = 'Payment Method'; signatoriesX = 'Signatories'; signatureX = 'Signature'; nameX = 'Name'; titleX = "Agreement Document"; itemX = "Item"; conceptX = "Concept"; estimatedDateX = "Estimated Date"; percentX = "Percent"; amountX = "Amount"; docVerifyX = 'Agreement Document Verification'; docNumberX = 'Crosscheck Id'; docAsuntoX = 'Subject'}
      if (this.props.language === 'fr'){ paymentFormX = 'Mode de Paiement'; signatoriesX = 'Signataires'; signatureX = 'Signature'; nameX = 'Name'; titleX = "Document d'accord"; itemX = "Item"; conceptX = "Concept"; estimatedDateX = "Estimated Date"; percentX = "Percent"; amountX = "Amount"; docVerifyX = 'Agreement Document Verification'; docNumberX = 'Crosscheck Id'; docAsuntoX = 'Subject'}
      if (this.props.language === 'es'){ paymentFormX = 'Forma de Pago'; signatoriesX = 'Firmantes'; signatureX = 'Firma'; nameX = 'Nombre'; titleX = "Documento de Acuerdo"; itemX = "Item"; conceptX = "Concepto"; estimatedDateX = "Fecha Estimada"; percentX = "Porcentaje"; amountX = "Monto"; docVerifyX = 'Verificación Documento de Acuerdo'; docNumberX = 'Crosscheck Id'; docAsuntoX = 'Asunto'}
      if (this.props.language === 'pt'){ paymentFormX = 'Forma de pagamento'; signatoriesX = 'Signatários'; signatureX = 'Signature'; nameX = 'Name'; titleX = "Documento de Acuerdo"; itemX = "Item"; conceptX = "Concept"; estimatedDateX = "Estimated Date"; percentX = "Percent"; amountX = "Amount"; docVerifyX = 'Agreement Document Verification'; docNumberX = 'Crosscheck Id'; docAsuntoX = 'Subject'}
      if (this.props.language === 'sv'){ paymentFormX = 'Betalningsmetod'; signatoriesX = 'Undertecknare'; signatureX = 'Signature'; nameX = 'Name'; titleX = "Avtalsdokument"; itemX = "Item"; conceptX = "Concept"; estimatedDateX = "Estimated Date"; percentX = "Percent"; amountX = "Amount"; docVerifyX = 'Agreement Document Verification'; docNumberX = 'Crosscheck Id'; docAsuntoX = 'Subject'}
      if (this.props.language === 'nl'){ paymentFormX = 'Betalingswijze'; signatoriesX = 'Ondertekenaars'; signatureX = 'Signature'; nameX = 'Name'; titleX = "Overeenkomst document"; itemX = "Item"; conceptX = "Concept"; estimatedDateX = "Estimated Date"; percentX = "Percent"; amountX = "Amount"; docVerifyX = 'Agreement Document Verification'; docNumberX = 'Crosscheck Id'; docAsuntoX = 'Subject'}
      if (this.props.language === 'ru'){ paymentFormX = 'Способ оплаты'; signatoriesX = 'Подписавшие'; signatureX = 'Signature'; nameX = 'Name'; titleX = "Документ соглашения"; itemX = "Item"; conceptX = "Concept"; estimatedDateX = "Estimated Date"; percentX = "Percent"; amountX = "Amount"; docVerifyX = 'Agreement Document Verification'; docNumberX = 'Crosscheck Id'; docAsuntoX = 'Subject'}
      if (this.props.language === 'jp'){ paymentFormX = '支払方法'; signatoriesX = '署名者'; signatureX = 'Signature'; nameX = 'Name'; titleX = "契約書"; itemX = "Item"; conceptX = "Concept"; estimatedDateX = "Estimated Date"; percentX = "Percent"; amountX = "Amount"; docVerifyX = 'Agreement Document Verification'; docNumberX = 'Crosscheck Id'; docAsuntoX = 'Subject'}
      if (this.props.language === 'cn'){ paymentFormX = '付款方法'; signatoriesX = '簽署人'; signatureX = 'Signature'; nameX = 'Name'; titleX = "协议文件"; itemX = "Item"; conceptX = "Concept"; estimatedDateX = "Estimated Date"; percentX = "Percent"; amountX = "Amount"; docVerifyX = 'Agreement Document Verification'; docNumberX = 'Crosscheck Id'; docAsuntoX = 'Subject'}
      if (this.props.language === 'de'){ paymentFormX = 'Zahlungsmethode'; signatoriesX = 'Unterzeichner'; signatureX = 'Signature'; nameX = 'Name'; titleX = "Einverständniserklärung"; itemX = "Item"; conceptX = "Concept"; estimatedDateX = "Estimated Date"; percentX = "Percent"; amountX = "Amount"; docVerifyX = 'Agreement Document Verification'; docNumberX = 'Crosscheck Id'; docAsuntoX = 'Subject'}
      if (this.props.language === 'it'){ paymentFormX = 'Metodo di pagamento'; signatoriesX = 'Firmatari'; signatureX = 'Signature'; nameX = 'Name'; titleX = "Documento di accordo"; itemX = "Item"; conceptX = "Concept"; estimatedDateX = "Estimated Date"; percentX = "Percent"; amountX = "Amount"; docVerifyX = 'Agreement Document Verification'; docNumberX = 'Crosscheck Id'; docAsuntoX = 'Subject'}

      if (this.props.language === 'en'){ digitallysignedX = 'Digitally signed by '; withdateX = 'With date '; totalsX = 'Totals'; registrationX = 'Blockchain Registration'}
      if (this.props.language === 'fr'){ digitallysignedX = 'Signé numériquement par '; withdateX = 'Avec date '; totalsX = 'Totaux'; registrationX = 'Enregistrement de la blockchain'}
      if (this.props.language === 'sp'){ digitallysignedX = 'Firmado digitalmente por '; withdateX = 'Con fecha '; totalsX = 'Totales'; registrationX = 'Registro Blockchain'}
      if (this.props.language === 'pt'){ digitallysignedX = 'Assinado digitalmente por '; withdateX = 'Com data '; totalsX = 'Totais'; registrationX = 'Registro de Blockchain'}
      if (this.props.language === 'sv'){ digitallysignedX = 'Digitalt signerad av '; withdateX = 'Med datum '; totalsX = 'Summor'; registrationX = 'Blockchain registrering'}
      if (this.props.language === 'nl'){ digitallysignedX = 'Digitaal ondertekend door '; withdateX = 'Met datum '; totalsX = 'Totalen'; registrationX = 'Blockchain-registratie'}
      if (this.props.language === 'ru'){ digitallysignedX = 'Цифровая подпись '; withdateX = 'С датой '; totalsX = 'Итоги'; registrationX = 'Блокчейн Регистрация'}
      if (this.props.language === 'jp'){ digitallysignedX = 'デジタル署名者 '; withdateX = '日付付き '; totalsX = '合計'; registrationX = 'ブロックチェーン登録'}
      if (this.props.language === 'cn'){ digitallysignedX = '數字簽名者 '; withdateX = '有日期 '; totalsX = '總計'; registrationX = '區塊鏈註冊'}
      if (this.props.language === 'de'){ digitallysignedX = 'Digital signiert von '; withdateX = 'Mit Datum '; totalsX = 'Summen'; registrationX = 'Blockchain-Registrierung'}
      if (this.props.language === 'it'){ digitallysignedX = 'Firmato digitalmente da '; withdateX = 'Con data '; totalsX = 'Totali'; registrationX = 'Registrazione Blockchain'}

      if (this.props.language === 'en'){ suscritoX = 'Document signed by digital signature'; }
      if (this.props.language === 'fr'){ suscritoX = 'Document signé par signature numérique'; }
      if (this.props.language === 'es'){ suscritoX = 'Documento suscrito mediante firma digital'; }
      if (this.props.language === 'pt'){ suscritoX = 'Documento assinado por assinatura digital'; }
      if (this.props.language === 'sv'){ suscritoX = 'Dokument signerat med digital signatur'; }
      if (this.props.language === 'nl'){ suscritoX = 'Document ondertekend met digitale handtekening'; }
      if (this.props.language === 'ru'){ suscritoX = 'Документ, подписанный электронной цифровой подписью'; }
      if (this.props.language === 'jp'){ suscritoX = 'デジタル署名によって署名されたドキュメント'; }
      if (this.props.language === 'cn'){ suscritoX = '由數字簽名簽署的文件'; }
      if (this.props.language === 'de'){ suscritoX = 'Dokument mit digitaler Signatur signiert'; }
      if (this.props.language === 'it'){ suscritoX = 'Documento firmato con firma digitale'; }

      if (this.props.language === 'en'){ paymentForm1X = "The total amount of this agreement is"; paymentForm2X = "and will be paid in"; paymentForm3X = "at the exchange rate at the time of payment"}
      if (this.props.language === 'fr'){ paymentForm1X = "Le montant total de cet accord est"; paymentForm2X = "aet sera payé en"; paymentForm3X = "au taux de change au moment du paiement"}
      if (this.props.language === 'es'){ paymentForm1X = "El monto total de este acuerdo es de"; paymentForm2X = "y será pagado en"; paymentForm3X = "al tipo de cambio del momento del pago"}
      if (this.props.language === 'pt'){ paymentForm1X = "O valor total deste contrato é"; paymentForm2X = "e será pago em"; paymentForm3X = "à taxa de câmbio no momento do pagamento"}
      if (this.props.language === 'sv'){ paymentForm1X = "Det totala beloppet för detta avtal är"; paymentForm2X = "och kommer att betalas in"; paymentForm3X = "till växelkursen vid betalningstillfällett"}
      if (this.props.language === 'nl'){ paymentForm1X = "Het totale bedrag van deze overeenkomst is"; paymentForm2X = "en wordt uitbetaald"; paymentForm3X = "tegen de wisselkoers op het moment van betaling"}
      if (this.props.language === 'ru'){ paymentForm1X = "Общая сумма этого договора составляет"; paymentForm2X = "и будет оплачен в"; paymentForm3X = "по курсу на момент оплаты"}
      if (this.props.language === 'jp'){ paymentForm1X = "この契約の総額は、"; paymentForm2X = "で支払われます"; paymentForm3X = "支払い時の為替レートで"}
      if (this.props.language === 'cn'){ paymentForm1X = "本協議總金額為"; paymentForm2X = "並將支付"; paymentForm3X = "按付款時的匯率"}
      if (this.props.language === 'de'){ paymentForm1X = "Der Gesamtbetrag dieser Vereinbarung beträgt"; paymentForm2X = "und wird einbezahlt"; paymentForm3X = "zum Wechselkurs zum Zeitpunkt der Zahlung"}
      if (this.props.language === 'it'){ paymentForm1X = "L'importo totale di questo accordo è"; paymentForm2X = "e verrà pagato"; paymentForm3X = "al tasso di cambio al momento del pagamento"}

      let textX = {}
      let textX2 = []
      if (this.props.contentState !== null){
         textX = this.props.contentState
         textX2 = textX.blocks
      }

      const firmantesX = this.props.jsonBlockstackY

      let displayFormaPagoX = false
      let formapagoX = []
      if (this.props.jsonBlockstackFormPago.length > 0){
         formapagoX = this.props.jsonBlockstackFormPago
         displayFormaPagoX = true
      }

      let typeContractBlank = false
      if (this.props.typeContract === 'blank'){
         typeContractBlank = true
      }

      const scale = 1.3
      const filedecodeAttachX = this.props.filedecodeAttachX

      let languageSpanishX = false
      if (this.props.language === 'es'){
         languageSpanishX = true
      }
      return (
        <Container fluid className="main-content-container px-4" >
           <Row>&nbsp;</Row>
           <Row>
              <Col lg="12">
                <div style={{textAlign: 'center'}}>
                  <h4>{docVerifyX}</h4>
                  <h5>{`${docNumberX}: ${this.props.usernameX}/${this.props.typeContract}/${this.props.numberContract}`}</h5>
                  <h5>{`${docAsuntoX}: ${this.props.description}`}</h5>
                </div>
              </Col>
           </Row>
           <Row>&nbsp;</Row>
           <Row>
              <div style={{fontSize:13, fontWeight: 'bold'}}>
                <span>{titleX}</span>
              </div>
           </Row>
           <Row>&nbsp;</Row>
           <Row>
             <Col lg="12">
               <Card theme="Light">
                  <Row>&nbsp;</Row>
                  {typeContractBlank ?
                    <Row>
                      <Col lg="12">
                        {textX2.map((todo, i) => {
                          if (todo.text !== undefined && todo.text !== ''){
                            return (
                              <div>
                                {todo.text}
                              </div>
                            )
                          }
                        })}
                      </Col>
                    </Row>
                  :
                    <Row form>
                      <Col md="12">
                          <Card small text-center>
                            <Col md="12">
                                <MyViewerPdf filedecodeAttachX={filedecodeAttachX} scale={scale} language={this.props.language} />
                            </Col>
                            <br></br>
                          </Card>
                      </Col>
                    </Row>
                  }
                  <Row>&nbsp;</Row>
               </Card>
             </Col>
           </Row>
           <Row>&nbsp;</Row>
           {displayFormaPagoX ?
             <>
               <Row>
                 <label htmlFor="" style={{fontSize:13, fontWeight: 'bold'}}>{paymentFormX}</label>
                 <Table size="sm"  style={{fontSize:13}} className="text-left" borderless responsive hover striped>
                   <thead>
                       <tr>
                         <td>{itemX}</td>
                         <td>{conceptX}</td>
                         <td>{estimatedDateX}</td>
                         <td>{percentX}</td>
                         <td>{amountX}</td>
                       </tr>
                   </thead>
                   <tbody>
                     {formapagoX.map((todo, i) => {
                       return (
                           <tr key={i} style={ this.props.colorDark ? { color:'white', fontSize:11} : {color:'black', fontSize:12}}>
                               <td>{++i}</td>
                               <td>{todo.concept}</td>
                               <td>{todo.estimateddate}</td>
                               <td>{`${todo.percent} %`}</td>
                               <td>{`${todo.amount} ${this.props.symbolcurrency}`}</td>
                           </tr>
                     )})}
                   </tbody>
                 </Table>
               </Row>
               <Row>
                 <div>{`${paymentForm1X} ${this.props.totaldocumento} ${this.props.symbolcurrency} ${paymentForm2X} ${this.props.cryptoCurrency} ${paymentForm3X}`}</div>
               </Row>
               <Row>&nbsp;</Row>
             </>
           :
             null
           }
           <Row>
             <label htmlFor="" style={{fontSize:13, fontWeight: 'bold'}}>{signatoriesX}</label>
             <Table size="sm"  style={{fontSize:13}} className="text-left" borderless responsive hover striped>
               <thead>
                   <tr>
                     <td>{nameX}</td>
                     <td>Id</td>
                     <td>{withdateX}</td>
                     <td>{signatureX}</td>
                     <td></td>
                   </tr>
               </thead>
               <tbody>
                 {firmantesX.map((todo, i) => {
                   if (todo.signature !== '' && todo.signature !== null && todo.signature !== undefined) {
                     return (
                         <tr key={i} style={ this.props.colorDark ? { color:'white', fontSize:11} : {color:'black', fontSize:12}}>
                             <td>{todo.name}</td>
                             <td>{todo.id}</td>
                             <td>{todo.signaturedatetime}</td>
                             <td><img src={todo.signpad} weight="50" height="70" alt=""/></td>
                             <td>{todo.signature}</td>
                         </tr>
                     )
                   }
                 })}
               </tbody>
             </Table>
           </Row>
           <div style={{fontSize:9, fontWeight: 'bold'}}>
             <Row>
               {languageSpanishX ?
                  <img src="images/digitally_signed_spanish.png" weight="70" height="70" alt=""/>
               :
                  <img src="images/digitally_signed_english.png" weight="70" height="70" alt=""/>
               }
             </Row>
             <Row>{suscritoX}</Row>
           </div>
           <div style={{fontSize:9}}>
             <Row>&nbsp;</Row>
             <Row>{`${registrationX}: ${this.props.getTransaction.block_hash}`}</Row>
             <Row>{`${withdateX}: ${this.props.getTransaction.burn_block_time_iso}`}</Row>
             <Row>{`URL: ` }<a href={`https://explorer.stacks.co/block/${this.props.getTransaction.block_hash}?chain=mainnet`} target="_blank" rel="noopener noreferrer">{`https://explorer.stacks.co/block/${this.props.getTransaction.block_hash}?chain=mainnet`}</a></Row>
           </div>
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
               <div className="text-center" style={{fontSize:13, color: this.state.colorPowered}}>
                   <FormattedMessage id="profile.poweredby" /><a href="https://paradigma.global" target="_blank" rel="noopener noreferrer">Paradigma</a><FormattedMessage id="profile.with" /><a href="https://bitcoin.org/" target="_blank" rel="noopener noreferrer">Bitcoin</a><FormattedMessage id="profile.and" /><a href="https://stacks.co" target="_blank" rel="noopener noreferrer">Stacks</a> Blockchain Technology
               </div>
             </Col>
             <Col lg="2"></Col>
           </Row>
           <Row>&nbsp;</Row>
           <Row>
             <Col lg="4"></Col>
             <Col lg="4">
               <Table size="sm" borderless responsive className="text-center">
                  <tbody>
                    <tr>
                      <td style={{ width: "25%" }}><a href={`https://${this.props.usernameX}`} target="_blank" rel="noopener noreferrer"><Home style={{ color: "grey" }} /></a></td>
                      <td style={{ width: "25%" }}><a href={`https://www.facebook.com/checkParadigma?_rdc=1&_rdr`} target="_blank" rel="noopener noreferrer"><Facebook style={{ color: "grey" }} /></a></td>
                      <td style={{ width: "25%" }}><a href={`https://twitter.com/CheckParadigma`} target="_blank" rel="noopener noreferrer"><Twitter style={{ color: "grey" }} /></a></td>
                      <td style={{ width: "25%" }}><a href={`https://www.youtube.com/channel/UCmb9qMswCHruc3IpNG-Pjcw/videos`} target="_blank" rel="noopener noreferrer"><YouTube style={{ color: "grey" }} /></a></td>
                    </tr>
                  </tbody>
              </Table>
             </Col>
             <Col lg="4"></Col>
           </Row>
        </Container>
      )
    }
}
export default MyDocument;
