import React from 'react';
import './_loader.css';

//translate
import { FormattedMessage } from 'react-intl';

const loader = () => (
  <div className="spinner">
    <FormattedMessage id="configuration.loadingdata" />
    <br></br>
    <div className="bounce1"></div>
    <div className="bounce2"></div>
    <div className="bounce3"></div>
  </div>
)

export default loader
