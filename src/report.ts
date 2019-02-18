export const EXHAUSTED = '$EXHAUSTED'
export const WRITE_IN = '$WRITE_IN'

export interface Candidate {
    id: string
    name: string
    write_in?: boolean
    party?: string
    exhausted?: boolean
}

export interface Meta {
    name: string
    candidates: Candidate[]
    date: string
    format: string
    tabulation: string
    files: [
        {
            name: string
            sha1: string
        }
    ]
    num_ballots: number
    normalized_ballots: string
}

export interface CandidateVotes {
    name: string
    votes: number
}

export interface VoteTransfer {
    to: string
    from: string
    count: number
}

export interface Round {
    round: number
    candidates: string[]
    results: CandidateVotes[]
    undervote: number
    overvote: number
    continuing_ballots: number
    eliminated: string[]
    transfers: VoteTransfer[]
}

export interface Graph {
    source: string
    edges: string[]
}

export interface PairwiseStat {
    first_candidate: string
    second_candidate: string
    numerator: number
    denominator: number
}

export interface FinalByFirstMatrix {
    finalists: string[]
    eliminated: string[]
    pairs: PairwiseStat[]
}

export interface Report {
    meta: Meta
    candidates: string[]
    winner: string,
    rounds: Round[]
    smith_set: string[]
    condorcet: string | null
    graph: Graph
    pairwise: PairwiseStat[]
    first_alternates: PairwiseStat[]
    final_by_first: FinalByFirstMatrix
}