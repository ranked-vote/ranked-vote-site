import * as React from 'react'

import { UltimateVote } from './report'
import { HeatmapElement } from './components/heatmap'
import { CaptionedHeatmap } from './components/captioned-heatmap'

type UltimateVoteMatrixProps = {
    data: UltimateVote[],
    eliminated: string[],
    final: string[],
}

export class UltimateVoteMatrix extends React.Component<UltimateVoteMatrixProps, {}> {
    render() {
        const EXHAUSTED_BALLOT = 'Exhausted Ballot';
        let data: HeatmapElement[] = this.props.data.map((d) => {
            return {
                row: d.firstChoice,
                col: d.ultimateChoice || EXHAUSTED_BALLOT,
                value: d.frac,
                data: d
            }
        });

        let cols = this.props.final.concat([EXHAUSTED_BALLOT]);

        let generateCaption = (element: HeatmapElement) => {
            let pct = (element.data.frac * 100).toFixed(1);
            let num = (element.data.num).toLocaleString();
            if (element.data.ultimateChoice === null) {
                return <span><strong>{pct}%</strong> of voters (<strong>{num}</strong>) who voted for <strong>{element.data.firstChoice}</strong> as
                their first choice exhausted their ballot before the final round.
                </span>
            } else {
                return <span><strong>{pct}%</strong> of voters (<strong>{num}</strong>) who voted for <strong>{element.data.firstChoice}</strong> as
                their first choice had their vote count towards <strong>{element.data.ultimateChoice}</strong> in the final round.
                </span>
            }
        }

        return <CaptionedHeatmap
            data={data}
            rows={this.props.eliminated}
            cols={cols}
            generateCaption={generateCaption}
            xlabel="Final Round Choice"
            ylabel="First Choice"
        />
    }
}
