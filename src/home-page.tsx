import * as React from 'react'

type HomePageProps = {
    reportsByYear: Map<number, { name: string, path: string }[]>
}

export class HomePage extends React.Component<HomePageProps, {}> {

    render() {
        let orderedReportsByYear = Array.from(this.props.reportsByYear.entries())
        orderedReportsByYear.sort((a, b) => b[0] - a[0])

        return <div>
            <h1>Ranked.Vote</h1>

            <p>Ranked-choice voting systems, such as <a href="https://en.wikipedia.org/wiki/Instant-runoff_voting">Instant Runoff Voting</a>,
            produce a richer set of data than more standard plurality systems. The reports linked below allow you to explore the results of
            each election in detail.</p>

            <ul>
                {
                    orderedReportsByYear.map(([year, reports]) =>
                        <>
                            <li>{year}</li>
                            <ul>
                                {reports.map((r, i) =>
                                    <li key={i}><a href={r.path}>{r.name}</a></li>
                                )}
                            </ul>
                        </>
                    )
                }
            </ul>
        </div>
    }
}