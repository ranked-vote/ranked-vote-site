import * as React from 'react'

import { Report } from './report'
import { FirstAlternateMatrix } from './first-alternate-matrix'
import { PairwisePrefsMatrix } from './pairwise-prefs-matrix'
import { CaptionedSankey } from './components/captioned-sankey'
import { UltimateVoteMatrix } from './ultimate-vote-matrix'
import { numberToString } from './numbers'
import { CandidateMap } from './candidate-map'

type ResultPageProps = {
    report: Report
}

export class ResultPage extends React.Component<ResultPageProps, {}> {
    render() {
        let candidateMap = new CandidateMap(this.props.report.meta.candidates)

        return <div style={{ marginBottom: '100px' }}>
            <div className="ui breadcrumb">
                <a className="section" href="/">Ranked.Vote</a>
                <div className="divider"> / </div>
                <a className="active section" href="#">{this.props.report.meta.name}</a>
            </div>

            <h1>{this.props.report.meta.name}</h1>

            <p><strong>{candidateMap.getName(this.props.report.winner)}</strong> won after <strong>{numberToString(this.props.report.rounds.length)}</strong> runoff rounds
                {
                    this.props.report.condorcet === this.props.report.winner ?
                        <span>, and was also the <a href="https://en.wikipedia.org/wiki/Condorcet_method">Condorcet winner</a>.</span>
                        : '.'
                }
            </p>

            <h2>Runoff Rounds</h2>

            <p>This diagram shows the votes of each remaining candidate at each round, as well as the breakdown of votes transferred when each candidate was eliminated.</p>

            <CaptionedSankey data={this.props.report.rounds} nameMap={candidateMap} />

            <h2>Pairwise Preferences</h2>
            <p>For every pair of candidates, this table shows what fraction of voters preferred one to the other.
                A preference means that either a voter ranks a candidate ahead of the other, or ranks a candidate but does not list the other.
                Ballots which list neither candidate are not counted towards the percent counts.
            </p>
            <PairwisePrefsMatrix data={this.props.report.pairwise} candidates={this.props.report.candidates} nameMap={candidateMap} />

            <h2>First Alternate</h2>
            <p>For every pair of candidates, this table shows the fraction of voters who ranked one candidate first ranked the other candidate second.
            </p>
            <FirstAlternateMatrix data={this.props.report.first_alternates} candidates={this.props.report.candidates} nameMap={candidateMap} />

            <h2>Final-round vote by First vote</h2>
            <p>For each candidate who was eliminated before the final round, this table shows which final-round candidate the eliminated candidate's first-round ballots went to.</p>
            <UltimateVoteMatrix data={this.props.report.final_by_first.pairs} eliminated={this.props.report.final_by_first.eliminated} final={this.props.report.final_by_first.finalists} nameMap={candidateMap} />
        </div>
    }
}