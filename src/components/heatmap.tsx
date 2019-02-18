import * as React from 'react'
import * as d3 from 'd3'

import { CandidateMap } from '../candidate-map'

export interface HeatmapElement<D> {
    row: string
    col: string
    value: number
    data?: D
}

interface HeatmapProps<D> {
    data: HeatmapElement<D>[]
    rows: string[]
    cols: string[]
    selected?: HeatmapElement<D>
    hoverCell?: ((HeatmapElement) => void)
    xlabel: string
    ylabel: string
    nameMap: CandidateMap
}

export class Heatmap<D> extends React.Component<HeatmapProps<D>, {}> {
    render() {
        const SIZE = 50
        const LABELSIZE = 130
        const MARGIN = 10
        const FONT_SIZE = '8pt'
        const COLOR_SCALE_RANGE = ['#eeeeee', '#ce6b14']

        let xScale = d3.scaleOrdinal()
            .domain(this.props.cols)
            .range(this.props.cols.map((_, i) => i * SIZE))
        let yScale = d3.scaleOrdinal()
            .domain(this.props.rows)
            .range(this.props.rows.map((_, i) => i * SIZE))

        let colorScale = d3.scaleLinear().domain([0, 1]).range(COLOR_SCALE_RANGE as any)

        let width = LABELSIZE + MARGIN + SIZE * this.props.cols.length
        let height = LABELSIZE + MARGIN + SIZE * this.props.rows.length

        let getName = this.props.nameMap.getName.bind(this.props.nameMap)

        return <svg width={width} style={{ maxWidth: '100%' }} viewBox={`0 0 ${width} ${height}`}>
            <text textAnchor="middle" x={LABELSIZE + (width - LABELSIZE) / 2} dominantBaseline="text-before-edge">{this.props.xlabel}</text>
            <text textAnchor="middle" dominantBaseline="text-before-edge" transform={`translate(0 ${LABELSIZE + (height - LABELSIZE) / 2}) rotate(-90)`}>{this.props.ylabel}</text>

            <g transform={`translate(${LABELSIZE} ${LABELSIZE + MARGIN + SIZE / 2})`}>
                {
                    this.props.rows.map((c, i) =>
                        <text
                            key={i}
                            y={yScale(c) as any}
                            textAnchor="end"
                            dominantBaseline="middle"
                            fontSize={FONT_SIZE}
                        >{getName(c)}</text>
                    )
                }
            </g>

            <g transform={`translate(${LABELSIZE + MARGIN + SIZE / 2} ${LABELSIZE})`}>
                {
                    this.props.cols.map((c, i) =>
                        <text
                            key={i}
                            transform={`translate(${xScale(c)}) rotate(-90)`}
                            dominantBaseline="middle"
                            fontSize={FONT_SIZE}
                        >{getName(c)}</text>
                    )
                }
            </g>

            <g transform={`translate(${LABELSIZE + MARGIN} ${LABELSIZE + MARGIN})`}>
                {
                    this.props.data.map((entry, i) =>
                        <g
                            key={i}
                            onMouseOver={() => this.props.hoverCell(entry)}
                            transform={`translate(${xScale(entry.col)} ${yScale(entry.row) as number})`}>
                            <rect
                                height={SIZE - 2}
                                width={SIZE - 2}
                                x={1}
                                y={1}
                                fill={colorScale(entry.value) as any}
                                stroke={(entry == this.props.selected) ? '#888' : 'none'}
                            />
                            <text fontSize={FONT_SIZE} x={SIZE / 2} y={SIZE / 2} dominantBaseline="middle" textAnchor="middle">{(entry.value * 100).toFixed(1)}%</text>
                        </g>
                    )
                }
            </g>
        </svg>
    }
}
