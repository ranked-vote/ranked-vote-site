import * as React from 'react'

import { Report } from '../report'

interface MetaDataTableProps {
    data: Report
}

export class MetaDataTable extends React.Component<MetaDataTableProps, {}> {
    render() {
        let data = this.props.data

        return <div>
            <table className="ui very basic table">
                <tbody>
                    <tr>
                        <td style={{ textAlign: 'right', fontWeight: 'bold' }}>Name</td>
                        <td>{data.meta.name}</td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: 'right', fontWeight: 'bold' }}>Date</td>
                        <td>{data.meta.date}</td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: 'right', fontWeight: 'bold' }}>Total Ballots</td>
                        <td>{data.meta.num_ballots.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: 'right', fontWeight: 'bold' }}>Input Format</td>
                        <td>{data.meta.format}</td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: 'right', fontWeight: 'bold' }}>Tabulation Method</td>
                        <td>{data.meta.tabulation}</td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: 'right', fontWeight: 'bold' }}>Normalized Ballot Data</td>
                        <td><samp>
                            <a href={`https://s3.amazonaws.com/ranked.vote-reports/${data.meta.normalized_ballots}`}>
                                {data.meta.normalized_ballots}</a></samp></td>
                    </tr>
                </tbody>
            </table>

            <h3>Raw Input Data</h3>
            <table className="ui table">
                <thead>
                    <tr>
                        <th>File Name</th>
                        <th>SHA-1</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.meta.files.map((f, i) => {
                            let fname = f.name.substr(4)
                            return <tr key={i}>
                                <td><samp><a href={`https://s3.amazonaws.com/ranked.vote/${fname}`}>{fname}</a></samp></td>
                                <td><samp>{f.sha1}</samp></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    }
}