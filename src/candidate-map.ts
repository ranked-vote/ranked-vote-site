import { Candidate, EXHAUSTED, WRITE_IN } from './report'

export class CandidateMap {
    candidateToInfo: Map<string, Candidate>

    constructor(candidates: Candidate[]) {
        this.candidateToInfo = new Map()

        candidates.forEach((c) => {
            this.candidateToInfo.set(c.id, c)
        })
        this.candidateToInfo.set(EXHAUSTED, { name: 'Exhausted Ballot', id: EXHAUSTED, exhausted: true })
        this.candidateToInfo.set(WRITE_IN, { name: 'Write-in', id: WRITE_IN, write_in: true })
    }

    getName(id: string) {
        if (!this.candidateToInfo.has(id)) return id
        return this.candidateToInfo.get(id).name
    }
}