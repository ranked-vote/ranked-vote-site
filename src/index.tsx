import * as glob from 'glob';
import * as fs from 'fs';
import * as path from 'path';

import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'

import { ResultPage } from './result-page';
import { HomePage } from './home-page';
import { Report } from './report'

function renderTemplate(body, title, analytics_code, headElements?) {
    return `<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="/style.css" />
        <link rel="icon" 
            type="image/png" 
            href="/icon.png">
        ${headElements || ''}
    </head>
    <body>
        <div class="ui container">
            <div id="root">${body}</div>
            <div class="ui divider"></div>
            <a rel="license" href="http://creativecommons.org/licenses/by/3.0/us/">
                <img style="width: 80px; height: 15px" alt="Creative Commons License" src="/cc_by.svg" /></a> <br />
            Created by <a href="https://paulbutler.org">Paul Butler</a>.
            The content on this page may be reproduced freely under the terms of the
            <a rel="license" href="http://creativecommons.org/licenses/by/3.0/us/">CC BY license</a>.
        </div>
        ${analytics_code}
    </body>
</html>`;
}

export default function render(locals) {
    const script = '<script src="/main.js"></script>';
    let wd = `${locals.cwd}/ranked-vote-data/reports/`;
    let files = glob.sync('**/*.json', { cwd: wd });

    let analytics_code = locals.analytics_code || '';

    let results = {};

    let reports = [];

    for (let file of files) {
        console.log(file)

        let data = JSON.parse(fs.readFileSync(wd + '/' + file, 'utf8')) as Report;
        let outPath = path.dirname(file);
        let title = data.meta.name + ' : Results and Analysis';

        results[outPath] = renderTemplate(
            ReactDOMServer.renderToString(<ResultPage report={data} />),
            title,
            analytics_code,
            script);

        reports.push({
            name: data.meta.name,
            path: outPath
        });
    }

    results['./'] = renderTemplate(
        ReactDOMServer.renderToString(<HomePage reports={reports} />),
        'Ranked.Vote: Results from Instant Runoff Elections',
        analytics_code);

    return results;
}
