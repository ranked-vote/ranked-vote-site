import * as React from 'react'

import { PairwiseStat } from './report'
import { HeatmapElement } from './components/heatmap'
import { CaptionedHeatmap } from './components/captioned-heatmap'

type UltimateVoteMatrixProps = {
    data: PairwiseStat[],
    eliminated: string[],
    final: string[],
}

export class UltimateVoteMatrix extends React.Component<UltimateVoteMatrixProps, {}> {
    render() {
        const EXHAUSTED_BALLOT = 'Exhausted Ballot';
        let data: HeatmapElement<PairwiseStat>[] = this.props.data.map((d) => {
            return {
                row: d.first_candidate,
                col: d.second_candidate,
                value: (d.numerator / d.denominator),
                data: d
            }
        });

        let generateCaption = (element: HeatmapElement<PairwiseStat>) => {
            let pct = ((element.data.numerator / element.data.denominator) * 100).toFixed(1);
            let num = (element.data.numerator).toLocaleString();
            if (element.data.second_candidate === null) {
                return <span><strong>{pct}%</strong> of voters (<strong>{num}</strong>) who voted for <strong>{element.data.first_candidate}</strong> as
                their first choice exhausted their ballot before the final round.
                </span>
            } else {
                return <span><strong>{pct}%</strong> of voters (<strong>{num}</strong>) who voted for <strong>{element.data.first_candidate}</strong> as
                their first choice had their vote count towards <strong>{element.data.second_candidate}</strong> in the final round.
                </span>
            }
        }

        return <CaptionedHeatmap
            data={data}
            rows={this.props.eliminated}
            cols={this.props.final}
            generateCaption={generateCaption}
            xlabel="Final Round Choice"
            ylabel="First Choice"
        />
    }
}
