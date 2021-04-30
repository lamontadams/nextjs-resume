import Link from "next/link";
import routes from "../lib/routes";
import { EmploymentData } from "../models/employmentData";
import utilStyles from '../styles/utils.module.css'
import DateRange from "./dateRange";

interface Props {
    experience: EmploymentData[]
}

export default function Experience({ experience } :Props) {
    return (
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
            <h2 className={utilStyles.headingLg}>Experience</h2>
            {experience.map(job => {
                return (<article>
                    <h3>{job.title}</h3>
                    <h4>{job.company}</h4>
                    <div>
                        <DateRange startDateString={job.start} endDateString={job.end} />
                    </div>
                    <p>{job.slug}</p>
                    <Link href={routes.employment(job.id)}>
                        Read More
                    </Link>
                    
                </article>)
            })}
        </section>
    );
}