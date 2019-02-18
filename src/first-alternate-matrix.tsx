import * as React from 'react'

import { FirstAlternateEntry } from './report'
import { HeatmapElement } from './components/heatmap'
import { CaptionedHeatmap } from './components/captioned-heatmap'

export class FirstAlternateMatrix extends React.Component<{ data: FirstAlternateEntry[], candidates: string[] }, {}> {
    render() {
        const EXHAUSTED_BALLOT = 'Exhausted Ballot';
        let data: HeatmapElement[] = this.props.data.map((d) => {
            return {
                row: d.firstCandidate,
                col: d.secondCandidate || EXHAUSTED_BALLOT,
                value: d.fracVotes,
                data: d
            }
        });

        let cols = this.props.candidates.concat([EXHAUSTED_BALLOT]);

        let generateCaption = (element: HeatmapElement) => {
            let data = element.data as FirstAlternateEntry;
            let pct = (data.fracVotes * 100).toFixed(1);

            if (data.secondCandidate === null) {
                return <span>
                    <strong>{pct}%</strong> of voters (<strong>{data.numVotes.toLocaleString()}</strong>) who voted
                    for <strong>{data.firstCandidate}</strong> as their first choice did not vote for a second choice.
                </span>
            } else {
                return <span>
                    <strong>{pct}%</strong> of voters (<strong>{data.numVotes.toLocaleString()}</strong>) who voted
                    for <strong>{data.firstCandidate}</strong> voted for <strong>{data.secondCandidate}</strong> as their second choice.
                </span>
            }
        }

        return <CaptionedHeatmap
            data={data}
            rows={this.props.candidates}
            cols={cols}
            generateCaption={generateCaption}
            xlabel="Second Choice"
            ylabel="First Choice"
        />
    }
}
