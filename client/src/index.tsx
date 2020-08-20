import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '@app/App';
import { initUsabilla } from '@services/usabilla';

ReactDOM.render(<App />, document.getElementById('app'));
initUsabilla();
