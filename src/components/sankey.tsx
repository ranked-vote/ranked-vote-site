import * as React from 'react'
import * as d3 from 'd3'

import { Round, CandidateVotes, VoteTransfer } from '../report'

type SankeyProps = {
    data: Round[],
    hoverNode?: ((CandidateVotes, Round) => void),
    hoverEdge?: ((VoteTransfer, Round) => void),
    selected: { edge?: VoteTransfer, node?: CandidateVotes, round?: Round },
}

export class Sankey extends React.Component<SankeyProps, {}> {
    render() {
        const ROUND_HEIGHT = 150;
        const WIDTH = 500;
        const BUFFER = 30;
        const BAR_HEIGHT = 20;
        const LABEL_MARGIN = 100;
        const LABELSIZE = 130;

        let rounds = this.props.data;

        let totalHeight = ROUND_HEIGHT * (rounds.length) + 2 * LABELSIZE;

        let firstRoundVotes = d3.sum(rounds[0].results as any, (d: CandidateVotes) => d.votes);

        let firstRoundCandidates = rounds[0].results.length;

        let xScale = d3.scaleLinear()
            .domain([0, firstRoundVotes])
            .range([0, WIDTH - firstRoundCandidates * BUFFER - LABEL_MARGIN]);
        let yScale = d3.scaleLinear()
            .domain([1, rounds.length])
            .range([LABELSIZE + 5, totalHeight - BAR_HEIGHT - LABELSIZE - 5]);

        let nodes = [];
        let edges = [];
        let lastX = new Map();
        let topLabels = [];
        let bottomLabels = [];

        for (let round of rounds) {
            let cumX = (firstRoundCandidates - round.results.length) * BUFFER / 2;
            let thisX = new Map();
            let curX = new Map();

            for (let candidate of round.results) {
                let width = xScale(candidate.votes);
                nodes.push({
                    x: cumX,
                    y: yScale(round.round),
                    width: width,
                    data: candidate,
                    round: round,
                });

                if (round === rounds[0]) {
                    topLabels.push({
                        x: cumX + width / 2,
                        label: candidate.name
                    });
                } else if (round === rounds[rounds.length - 1]) {
                    bottomLabels.push({
                        x: cumX + width / 2,
                        label: candidate.name
                    })
                }

                curX.set(candidate.name, cumX);
                thisX.set(candidate.name, cumX);

                cumX += xScale(candidate.votes) + BUFFER;
            }

            for (let transfer of round.transfers) {
                let width = xScale(transfer.count);

                let x0 = lastX.get(transfer.from);
                lastX.set(transfer.from, x0 + width);

                let x1 = curX.get(transfer.to);
                curX.set(transfer.to, x1 + width);

                edges.push({
                    x0: x0,
                    x1: x1,
                    y0: yScale(round.round - 1) + BAR_HEIGHT,
                    y1: yScale(round.round),
                    width: width,
                    data: transfer,
                    round: round,
                });
            }

            lastX = thisX;
        }

        let sankeyPath = (e) => {
            let x0 = e.x0;
            let y0 = e.y0;
            let x1 = e.x1;
            let y1 = e.y1;
            let width = e.width;

            let midY = (y0 + y1) / 2;

            return `M${x0} ${y0} C ${x0} ${midY} ${x1} ${midY} ${x1} ${y1} H ${x1 + width} C ${x1 + width} ${midY} ${x0 + width} ${midY} ${x0 + width} ${y0} Z`;
        };

        return <svg width="100%" viewBox={`0 0 ${WIDTH} ${totalHeight}`}>
            <g transform={`translate(${LABEL_MARGIN} 0)`}>
                {
                    nodes.map((r, i) =>
                        <rect
                            key={i}
                            x={r.x}
                            y={r.y}
                            width={r.width}
                            height={BAR_HEIGHT}
                            fill={(r.data.candidate === null) ? "#333" : "#aa4488"}
                            opacity={this.props.selected && (r.data == this.props.selected.node) ? 1.0 : 0.8}
                            onMouseOver={() => this.props.hoverNode(r.data, r.round)}

                        />)
                }
                {
                    edges.map((e, i) =>
                        <path
                            key={i}
                            d={sankeyPath(e)}
                            fill="#000"
                            stroke='#000'
                            strokeWidth={0.1}
                            opacity={this.props.selected && (e.data == this.props.selected.edge) ? 0.5 : 0.3}
                            onMouseOver={() => this.props.hoverEdge(e.data, e.round)}
                        />)
                }
                {
                    topLabels.map(
                        (result, i) =>
                            <text
                                key={i}
                                dominantBaseline="middle"
                                transform={`translate(${result.x} ${LABELSIZE}) rotate(-90)`}
                            > {result.label}</text>)
                }
                {
                    bottomLabels.map(
                        (result, i) =>
                            <text
                                key={i}
                                dominantBaseline="middle"
                                textAnchor="end"
                                transform={`translate(${result.x} ${totalHeight - LABELSIZE}) rotate(-90)`}
                            > {result.label}</text>)
                }
            </g>
            {
                rounds.map((r, i) =>
                    <text key={i} dominantBaseline="text-before-edge" y={yScale(r.round)}>Round {r.round}</text>
                )
            }
        </svg>
    }
}