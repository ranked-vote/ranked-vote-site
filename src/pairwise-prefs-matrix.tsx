import * as React from 'react'

import { PairwiseStat } from './report'
import { HeatmapElement } from './components/heatmap'
import { CaptionedHeatmap } from './components/captioned-heatmap'

export class PairwisePrefsMatrix extends React.Component<{ data: PairwiseStat[], candidates: string[] }, {}> {
    render() {
        let data: HeatmapElement<PairwiseStat>[] = this.props.data.map((d) => {
            return {
                row: d.first_candidate,
                col: d.second_candidate,
                value: d.numerator / d.denominator,
                data: d
            }
        });

        let generateCaption = (element: HeatmapElement<PairwiseStat>) => {
            let data = element.data as PairwiseStat;
            let pct = ((data.numerator / data.denominator) * 100).toFixed(1);

            return <span>Of <strong>{data.denominator.toLocaleString()}</strong> voters who ranked at least one of
            the two candidates, <strong>{pct}%</strong> (<strong>{data.numerator.toLocaleString()}</strong>)
            preferred <strong>{data.first_candidate}</strong> over <strong>{data.second_candidate}</strong>.
            </span>;
        }

        return <CaptionedHeatmap
            data={data}
            rows={this.props.candidates}
            cols={this.props.candidates}
            generateCaption={generateCaption}
            xlabel="Less Preferred"
            ylabel="More Preferred"
        />
    }
}
