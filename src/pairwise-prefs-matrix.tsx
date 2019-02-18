import * as React from 'react'

import { PairwisePreferenceEntry } from './report'
import { HeatmapElement } from './components/heatmap'
import { CaptionedHeatmap } from './components/captioned-heatmap'

export class PairwisePrefsMatrix extends React.Component<{ data: PairwisePreferenceEntry[], candidates: string[] }, {}> {
    render() {
        const EXHAUSTED_BALLOT = 'Exhausted Ballot';
        let data: HeatmapElement[] = this.props.data.map((d) => {
            return {
                row: d.candidate1,
                col: d.candidate2,
                value: d.preferred1Pct,
                data: d
            }
        });


        let generateCaption = (element: HeatmapElement) => {
            let data = element.data as PairwisePreferenceEntry;
            let pct = (data.preferred1Pct * 100).toFixed(1);

            return <span>Of <strong>{data.listedEither.toLocaleString()}</strong> voters who ranked at least one of
            the two candidates, <strong>{pct}%</strong> (<strong>{data.preferred1.toLocaleString()}</strong>)
            preferred <strong>{data.candidate1}</strong> over <strong>{data.candidate2}</strong>.
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
