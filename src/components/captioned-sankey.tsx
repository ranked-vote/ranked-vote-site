import * as React from 'react'

import { Sankey } from './sankey'
import { Round, CandidateVotes, VoteTransfer, EXHAUSTED } from '../report'
import { CandidateMap } from '../candidate-map'

interface CaptionedSankeyProps {
    data: Round[]
    nameMap: CandidateMap
};

interface CaptionedSankeyState {
    selected: { edge?: VoteTransfer, node?: CandidateVotes, round?: Round }
}

export class CaptionedSankey extends React.Component<CaptionedSankeyProps, CaptionedSankeyState> {
    constructor(props) {
        super(props)

        this.state = {
            selected: null
        }
    }

    hoverNode(node: CandidateVotes, round: Round) {
        this.setState({
            selected: { node, round }
        })
    }

    hoverEdge(edge: VoteTransfer, round: Round) {
        this.setState({
            selected: { edge, round }
        })
    }

    hoverOut() {
        this.setState({
            selected: null
        })
    }

    generateCaption() {
        let round = this.state.selected.round
        let getName = this.props.nameMap.getName.bind(this.props.nameMap)

        if (this.state.selected.edge) {
            let edge = this.state.selected.edge

            if (edge.from === EXHAUSTED && edge.to === EXHAUSTED) {
                return <span><strong>{edge.count.toLocaleString()}</strong> exhaused or spoiled ballots carried over to <strong>round&nbsp;{round.round}</strong>.</span>
            } else if (edge.to === EXHAUSTED) {
                return <span><strong>{getName(edge.from)}</strong> was eliminated in <strong>round&nbsp;{round.round}</strong>, causing <strong>{edge.count.toLocaleString()}</strong> ballots to be exhaused because they had no further preferences.</span>
            } else if (edge.from === edge.to) {
                return <span><strong>{getName(edge.to)}</strong> remained in <strong>round&nbsp;{round.round}</strong>, keeping <strong>{edge.count.toLocaleString()}</strong> votes from <strong>round&nbsp;{round.round - 1}</strong>.</span>
            } else {
                return <span><strong>{getName(edge.from)}</strong> was eliminated in <strong>round&nbsp;{round.round}</strong>, transferring <strong>{edge.count.toLocaleString()}</strong> votes to <strong>{getName(edge.to)}</strong>.</span>
            }

        } else if (this.state.selected.node) {
            let node = this.state.selected.node
            if (node.name === EXHAUSTED) {
                if (round.round == 1) {
                    return <span><strong>{node.votes.toLocaleString()}</strong> ballots either did not vote in this race, or were spoiled ballots.</span>
                } else {
                    return <span><strong>{node.votes.toLocaleString()}</strong> ballots either did not vote in this race, were spoiled ballots, or did not list any candidates who remained through to <strong>round&nbsp;{round.round}</strong>.</span>
                }

            } else {
                return <span><strong>{getName(node.name)}</strong> received <strong>{node.votes.toLocaleString()}</strong> votes in <strong>round&nbsp;{round.round}</strong>.</span>
            }

        } else {
            return null
        }
    }

    render() {
        return <div className="ui stackable grid" style={{ margin: '30px 0' }} onMouseLeave={this.hoverOut.bind(this)}>
            <div className="ten wide column">
                <Sankey data={this.props.data} hoverNode={this.hoverNode.bind(this)} hoverEdge={this.hoverEdge.bind(this)} selected={this.state.selected} nameMap={this.props.nameMap} />
            </div>
            <div className="six wide column top-margin-if-not-stacked">
                {
                    this.state.selected ? this.generateCaption() : null
                }
            </div>
        </div>
    }
}
