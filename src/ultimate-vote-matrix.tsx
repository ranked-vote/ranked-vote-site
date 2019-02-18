import * as React from 'react'

import { PairwiseStat, EXHAUSTED } from './report'
import { HeatmapElement } from './components/heatmap'
import { CaptionedHeatmap } from './components/captioned-heatmap'
import { CandidateMap } from './candidate-map'


interface UltimateVoteMatrixProps {
    data: PairwiseStat[]
    eliminated: string[]
    final: string[]
    nameMap: CandidateMap
}

export class UltimateVoteMatrix extends React.Component<UltimateVoteMatrixProps, {}> {
    render() {
        let data: HeatmapElement<PairwiseStat>[] = this.props.data.map((d) => {
            return {
                row: d.first_candidate,
                col: d.second_candidate,
                value: (d.numerator / d.denominator),
                data: d
            }
        })

        let generateCaption = (element: HeatmapElement<PairwiseStat>) => {
            let pct = ((element.data.numerator / element.data.denominator) * 100).toFixed(1)
            let num = (element.data.numerator).toLocaleString()
            let getName = this.props.nameMap.getName.bind(this.props.nameMap)

            if (element.data.second_candidate === EXHAUSTED) {
                return <span><strong>{pct}%</strong> of voters (<strong>{num}</strong>) who voted for <strong>{getName(element.data.first_candidate)}</strong> as
                their first choice exhausted their ballot before the final round.
                </span>
            } else {
                return <span><strong>{pct}%</strong> of voters (<strong>{num}</strong>) who voted for <strong>{getName(element.data.first_candidate)}</strong> as
                their first choice had their vote count towards <strong>{getName(element.data.second_candidate)}</strong> in the final round.
                </span>
            }
        }

        return <CaptionedHeatmap
            nameMap={this.props.nameMap}
            data={data}
            rows={this.props.eliminated}
            cols={this.props.final}
            generateCaption={generateCaption}
            xlabel="Final Round Choice"
            ylabel="First Choice"
        />
    }
}
