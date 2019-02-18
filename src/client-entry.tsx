import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { ResultPage } from './result-page'

let fetchPromise = fetch('report.json').then((e) => e.json())
let loadPromise = new Promise((resolve, _) => document.addEventListener('DOMContentLoaded', resolve))

Promise.all([fetchPromise, loadPromise]).then((values) => {
    let report = values[0]
    ReactDOM.hydrate(
        <ResultPage report={report} />, document.getElementById('root'))
})
