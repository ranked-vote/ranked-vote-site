import * as React from 'react'

import { Heatmap, HeatmapElement } from './heatmap'

type CaptionedHeatmapProps<D> = {
    data: HeatmapElement<D>[],
    rows: string[],
    cols: string[],
    generateCaption: (HeatmapElement) => React.ReactElement<any>,
    xlabel: string,
    ylabel: string,
};

type CaptionedHeatmapState<D> = {
    selected: HeatmapElement<D>
}

export class CaptionedHeatmap<D> extends React.Component<CaptionedHeatmapProps<D>, CaptionedHeatmapState<D>> {
    constructor(props) {
        super(props);

        this.state = {
            selected: null
        };
    }

    hoverCell(element: HeatmapElement<D>) {
        this.setState({
            selected: element
        });
    }

    hoverOut() {
        this.setState({
            selected: null
        });
    }

    render() {
        return <div className="ui stackable grid" style={{ margin: '30px 0' }} onMouseLeave={this.hoverOut.bind(this)}>
            <div className="nine wide column right-if-not-stacked">
                <Heatmap
                    data={this.props.data}
                    rows={this.props.rows}
                    cols={this.props.cols}
                    hoverCell={this.hoverCell.bind(this)}
                    selected={this.state.selected}
                    xlabel={this.props.xlabel}
                    ylabel={this.props.ylabel}
                />
            </div>
            <div className="seven wide column top-margin-if-not-stacked">
                {
                    this.state.selected ? this.props.generateCaption(this.state.selected) : null
                }
            </div>
        </div>
    }
}
