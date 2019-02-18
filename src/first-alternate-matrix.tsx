import * as React from 'react'

import { PairwiseStat } from './report'
import { HeatmapElement } from './components/heatmap'
import { CaptionedHeatmap } from './components/captioned-heatmap'

export class FirstAlternateMatrix extends React.Component<{ data: PairwiseStat[], candidates: string[] }, {}> {
    render() {
        const EXHAUSTED_BALLOT = '$UNDERVOTE';
        let data: HeatmapElement<PairwiseStat>[] = this.props.data.map((d) => {
            return {
                row: d.first_candidate,
                col: d.second_candidate || EXHAUSTED_BALLOT,
                value: d.numerator / d.denominator,
                data: d
            }
        });

        let cols = this.props.candidates.concat([EXHAUSTED_BALLOT]);

        let generateCaption = (element: HeatmapElement<PairwiseStat>) => {
            let data = element.data;
            let pct = ((data.numerator / data.denominator) * 100).toFixed(1);

            if (data.second_candidate === null) {
                return <span>
                    <strong>{pct}%</strong> of voters (<strong>{data.numerator.toLocaleString()}</strong>) who voted
                    for <strong>{data.first_candidate}</strong> as their first choice did not vote for a second choice.
                </span>
            } else {
                return <span>
                    <strong>{pct}%</strong> of voters (<strong>{data.numerator.toLocaleString()}</strong>) who voted
                    for <strong>{data.first_candidate}</strong> voted for <strong>{data.second_candidate}</strong> as their second choice.
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
