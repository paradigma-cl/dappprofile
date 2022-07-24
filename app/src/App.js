// React
import React, { PureComponent } from 'react';

// Components
import Profile from './components/profile/profile.js';
import DisplayJson from './components/displayjson/displayjson.js';

// Translate
import { IntlProvider } from "react-intl";
import messages_es from "./languages/i18n/es.json";
import messages_en from "./languages/i18n/en.json";
import messages_fr from "./languages/i18n/fr.json";
import messages_pt from "./languages/i18n/pt.json";
import messages_sv from "./languages/i18n/sv.json";
import messages_nl from "./languages/i18n/nl.json";
import messages_ru from "./languages/i18n/ru.json";
import messages_jp from "./languages/i18n/jp.json";
import messages_cn from "./languages/i18n/cn.json";
import messages_de from "./languages/i18n/de.json";
import messages_it from "./languages/i18n/it.json";

import 'bootstrap/dist/css/bootstrap.css';
import './styles/shards-dashboards.min.css';

//----------------------------
class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      messages: {
        'es': messages_es,
        'en': messages_en,
        'fr': messages_fr,
        'pt': messages_pt,
        'sv': messages_sv,
        'nl': messages_nl,
        'ru': messages_ru,
        'jp': messages_jp,
        'cn': messages_cn,
        'de': messages_de,
        'it': messages_it
      },
      language: navigator.language.split(/[-_]/)[0],
    }
  }

  render() {
    let language3 = window.navigator.language||navigator.browserLanguage;
    language3 = language3.substring(0,2);
    if (language3 !=='en' && language3 !=='es' && language3 !=='fr' && language3 !=='pt' && language3 !=='sv' && language3 !=='nl' && language3 !=='ru' && language3 !=='jp' && language3 !=='cn' && language3 !=='de' && language3 !=='it'){
      language3 ='en'
    }

    const userProfileX = window.location.origin;
    const ArrayIdValue = userProfileX.split('https://')
    let userProfile = ArrayIdValue[1]

    let bDisplayProfile = false
    if (window.location.search === '?profile'){
       bDisplayProfile = true
    }

    return (
      <IntlProvider locale={language3} messages={this.state.messages[language3]}>
           {bDisplayProfile ?
               <DisplayJson userProfile={userProfile} language={language3} />
           :
               <Profile userProfile={userProfile} language={language3} />
           }
      </IntlProvider>
    );
  }
}

export default App;
