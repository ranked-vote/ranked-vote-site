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
    //const candidateWins = props.data.candidate_votes > props.data.other_candidate_votes

    return <tr>
        <td>
            {props.nameMap.getName(props.data.candidate)}
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
        <td>
            {props.nameMap.getName(props.data.other_candidate)}
        </td>
    </tr>
}

export function HonestApprovalSet(props: {data: ApprovalSet, nameMap: CandidateMap}) {
    return <div>
        <h3>Potential Winners</h3>
        <table className="ui collapsing table">
            <thead>
                <tr>
                    <th>Candidate</th>
                    <th></th>
                    <th>Next-best Candidate</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.data.approval_set.map((d) => <HonestApprovalSetItem data={d} nameMap={props.nameMap} />)
                }
            </tbody>
        </table>
        {
            props.data.approval_set_compliment ?
        <div>
        <h3>Other Candidates</h3>
        <table className="ui collapsing table">
            <thead>
                <tr>
                    <th>Candidate</th>
                    <th></th>
                    <th>Best Candidate</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.data.approval_set_compliment.map((d) => <HonestApprovalSetItem data={d} nameMap={props.nameMap} />)
                }
            </tbody>
        </table></div> : null
        }
    </div>

}