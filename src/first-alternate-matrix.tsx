import * as React from 'react'

import { PairwiseStat, EXHAUSTED } from './report'
import { HeatmapElement } from './components/heatmap'
import { CaptionedHeatmap } from './components/captioned-heatmap'
import { CandidateMap } from './candidate-map'


export class FirstAlternateMatrix extends React.Component<{ data: PairwiseStat[], candidates: string[], nameMap: CandidateMap }, {}> {
    render() {
        let data: HeatmapElement<PairwiseStat>[] = this.props.data.map((d) => {
            return {
                row: d.first_candidate,
                col: d.second_candidate,
                value: d.numerator / d.denominator,
                data: d
            }
        })

        let cols = this.props.candidates.concat([EXHAUSTED])

        let generateCaption = (element: HeatmapElement<PairwiseStat>) => {
            let data = element.data
            let pct = ((data.numerator / data.denominator) * 100).toFixed(1)
            let getName = this.props.nameMap.getName.bind(this.props.nameMap)


            if (data.second_candidate === EXHAUSTED) {
                return <span>
                    <strong>{pct}%</strong> of voters (<strong>{data.numerator.toLocaleString()}</strong>) who voted
                    for <strong>{getName(data.first_candidate)}</strong> as their first choice did not vote for a second choice.
                </span>
            } else {
                return <span>
                    <strong>{pct}%</strong> of voters (<strong>{data.numerator.toLocaleString()}</strong>) who voted
                    for <strong>{getName(data.first_candidate)}</strong> voted for <strong>{getName(data.second_candidate)}</strong> as their second choice.
                </span>
            }
        }

        return <CaptionedHeatmap
            nameMap={this.props.nameMap}
            data={data}
            rows={this.props.candidates}
            cols={cols}
            generateCaption={generateCaption}
            xlabel="Second Choice"
            ylabel="First Choice"
        />
    }
}
