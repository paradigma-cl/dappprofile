import React, { Component } from "react";
import PDF from "react-pdf-js";
import { Row, Col, FormSelect } from "shards-react";
import { Table } from 'reactstrap';

class MyViewerPdf extends Component {

  constructor(props) {
      super(props);
      this.handlePrevious = this.handlePrevious.bind(this);
      this.handleNext = this.handleNext.bind(this);
      this.onDocumentComplete = this.onDocumentComplete.bind(this);

      this.state = {
        page: 1,
        pages: 1,
        contractPageX: '',
        language: 'English',
        scale: this.props.scale,
      }
  }

  cScale = React.createRef();

  onDocumentComplete(pages) {
    this.setState({ page: 1 });
    this.setState({ pages: pages });
  }

  handleInitial = (e) => {
    if (this.state.page > 1){
       this.setState({ page: 1 });
    }
  }

  handlePrevious = (e) => {
    if (this.state.page > 1){
       this.setState({ page: this.state.page - 1 });
    }
  }

  handleNext = (e) => {
    if (this.state.page < this.state.pages){
      this.setState({ page: this.state.page + 1 });
    }
  }

  handleFinal = (e) => {
    if (this.state.page < this.state.pages){
      this.setState({ page: this.state.pages });
    }
  }

  scalePDF = (e) => {
    this.setState({ scale: this.cScale.current.value });
  }

  UNSAFE_componentWillMount() {
    const languageX = localStorage.getItem('language')
    if (languageX === undefined || languageX === ''){
      this.setState({ language: 'English' })
    }else{
      this.setState({ language: languageX })
    }
  }

  renderPagination() {
    let contractPageX = ''
    if (this.state.language === 'English'){contractPageX = `${this.state.page} of ${this.state.pages}`}
    if (this.state.language === 'French'){contractPageX = `${this.state.page} de ${this.state.pages}`}
    if (this.state.language === 'Spanish'){contractPageX = `${this.state.page} de ${this.state.pages}`}
    if (this.state.language === 'Portuguese'){contractPageX = `${this.state.page} do ${this.state.pages}`}
    if (this.state.language === 'Swedish'){contractPageX = `${this.state.page} av ${this.state.pages}`}
    if (this.state.language === 'Netherlands'){contractPageX = `${this.state.page} van ${this.state.pages}`}
    if (this.state.language === 'Russian'){contractPageX = `${this.state.page} из ${this.state.pages}`}
    if (this.state.language === 'Japanese'){contractPageX = `${this.state.page} の ${this.state.pages}`}
    if (this.state.language === 'Chinese'){contractPageX = `${this.state.page} 的 ${this.state.pages}`}
    if (this.state.language === 'German'){contractPageX = `${this.state.page} von ${this.state.pages}`}
    if (this.state.language === 'Italian'){contractPageX = `${this.state.page} di ${this.state.pages}`}
    return (
      <>
        <Row form>
          <Col md="3"></Col>
          <Col md="5" style={{fontSize:12}}>
            <div>
              <Table size="sm" style={{"color": 'black'}} className="text-center">
                <tbody>
                    <tr>
                      <td><strong style={{cursor: 'pointer'}} onClick={e=>this.handleInitial(e)}><img src="images/initial.png" weight="15" height="15" alt=""/></strong></td>
                      <td><strong style={{cursor: 'pointer'}} onClick={e=>this.handlePrevious(e)}><img src="images/previous.png" weight="20" height="20" alt=""/></strong></td>
                      <td> &nbsp;&nbsp;{contractPageX}&nbsp;&nbsp;</td>
                      <td><strong style={{cursor: 'pointer'}} onClick={e=>this.handleNext(e)}><img src="images/next.png" weight="20" height="20" alt=""/></strong></td>
                      <td><strong style={{cursor: 'pointer'}} onClick={e=>this.handleFinal(e)}><img src="images/end.png" weight="15" height="15" alt=""/></strong></td>
                      <td><FormSelect
                          id="Scale"
                          innerRef={this.cScale}
                          onChange={e=>this.scalePDF(e)}
                          style={{backgroundColor:"#F2EACE"}}
                        >
                        <option value="0.5" >0.5x</option>
                        <option value="0.7" >0.7x</option>
                        <option value="1.0" >1.0x</option>
                        <option value="1.3" selected >1.3x</option>
                        <option value="1.5" >1.5x</option>
                      </FormSelect>
                      </td>
                    </tr>
                </tbody>
              </Table>
            </div>
          </Col>
          <Col md="4"></Col>
        </Row>
      </>
    );
  }

  render() {
    let pagination = null;
    let {filedecodeAttachX} = this.props
    //if (this.state.pages > 1) {
      pagination = this.renderPagination();
    //}
    return (
      <div>
        <PDF
          file={filedecodeAttachX}
          page={this.state.page}
          onDocumentComplete={this.onDocumentComplete}
          scale={this.state.scale}
        />
        {pagination}
      </div>
    );
  }
}
export default MyViewerPdf;
