import * as React from 'react'

import { ApprovalSet, ApprovalItem } from '../report'
import { CandidateMap } from '../candidate-map'

const MAX_BAR_WIDTH = 200
const BAR_HEIGHT = 10
const BAR_MARGIN = 5

const ACTIVE_COLOR = '#a48'
const INACTIVE_COLOR = '#ccc'

function HonestApprovalSetItem(props: {data: ApprovalItem, nameMap: CandidateMap}) {
    const barMax = Math.max(props.data.candidate_votes, props.data.other_candidate_votes)
    const candidateWins = props.data.candidate_votes > props.data.other_candidate_votes
    const textColor = candidateWins ? '#000' : '#999'

    return <tr>
        <td>
            <span style={{color: textColor}}>
            {props.nameMap.getName(props.data.candidate)}
            </span>
        </td>
        <td>
            <svg height={BAR_MARGIN + 2 * BAR_HEIGHT} width={MAX_BAR_WIDTH}>
                <rect
                    x="0"
                    width={MAX_BAR_WIDTH * (props.data.candidate_votes / barMax)}
                    y="0"
                    height={BAR_HEIGHT}
                    fill={ACTIVE_COLOR}
                    />
                <rect
                    x="0"
                    width={MAX_BAR_WIDTH * (props.data.other_candidate_votes / barMax)}
                    y={BAR_HEIGHT + BAR_MARGIN}
                    height={BAR_HEIGHT}
                    fill={INACTIVE_COLOR}
                    />
            </svg>
        </td>
        <td style={{color: textColor}}>
            {
                candidateWins ? `Wins ${props.data.candidate_votes.toLocaleString()} to ${props.data.other_candidate_votes.toLocaleString()}`
                : `Loses ${props.data.other_candidate_votes.toLocaleString()} to ${props.data.candidate_votes.toLocaleString()}`
            }
        </td>
    </tr>
}

export function HonestApprovalSet(props: {data: ApprovalSet, nameMap: CandidateMap}) {
    return  <table className="ui collapsing table">
            <thead>
                <tr>
                    <th>Candidate</th>
                    <th></th>
                    <th>Most Favorable Scenario</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.data.approval_set.map((d) => <HonestApprovalSetItem data={d} nameMap={props.nameMap} />)
                }
                {
                    props.data.approval_set_compliment.map((d) => <HonestApprovalSetItem data={d} nameMap={props.nameMap} />)
                }
            </tbody>
        </table>

}