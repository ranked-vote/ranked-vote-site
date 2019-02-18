import * as React from 'react'

type HomePageProps = {
    reports: { name: string, path: string }[]
}

export class HomePage extends React.Component<HomePageProps, {}> {
    render() {
        return <div>
            <h1>Ranked.Vote</h1>

            <p>Ranked-choice voting systems, such as <a href="https://en.wikipedia.org/wiki/Instant-runoff_voting">Instant Runoff Voting</a>,
            produce a richer set of data than more standard plurality systems. The reports linked below allow you to explore the results of
            each election in detail.</p>

            <ul>
                {
                    this.props.reports.map((r, i) =>
                        <li key={i}><a href={r.path}>{r.name}</a></li>
                    )
                }
            </ul>
        </div>
    }
}