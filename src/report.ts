
export type PairwisePreferenceEntry = {
    candidate1: string,
    candidate2: string,
    listedEither: number,
    preferred1: number,
    preferred1Pct: number,
}

export type FirstAlternateEntry = {
    firstCandidate: string,
    secondCandidate: string,
    numVotes: number,
    fracVotes: number,
}

export type CandidateVotes = {
    candidate: string,
    votes: number,
}

export type VoteTransfer = {
    fromCandidate: string,
    toCandidate: string,
    votes: number
}

export type Round = {
    round: number,
    results: CandidateVotes[],
    eliminated: string[],
    transfers: VoteTransfer[],
}

export type Election = {
    name: string,
    method: string,
    date: string,
}

export type Outcome = {
    winner: string,
    condorcet: boolean,
    eliminated: string[],
    final: string[],
}

export type UltimateVote = {
    firstChoice: string,
    ultimateChoice: string,
    num: number,
    frac: number,
}

export type Report = {
    ballots: number,
    election: Election,
    candidates: string[],
    pairwisePreferences: PairwisePreferenceEntry[],
    firstAlternates: FirstAlternateEntry[],
    rounds: Round[],
    outcome: Outcome,
    ultimateVotes: UltimateVote[],
}
