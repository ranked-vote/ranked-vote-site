export interface Meta {
    name: string
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

export interface Round {
    round: number
    candidates: string[]
    results: CandidateVotes[]
    undervote: number
    overvote: number
    continuing_ballots: number
    eliminated: string[]
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

export interface Report {
    meta: Meta
    candidates: string[]
    rounds: Round[]
    smith_set: string[]
    condorcet: string | null
    graph: Graph
    pairwise: PairwiseStat[]
    first_alternates: PairwiseStat[]
    final_by_first: PairwiseStat[]
}