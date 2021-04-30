import Link from "next/link";
import routes from "../lib/routes";
import { ProjectData } from "../models/projectData";
import utilStyles from '../styles/utils.module.css'
interface Props {
    projects: ProjectData[];
}

export default function Projects({ projects }: Props) {
    return (
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
            <h2 className={utilStyles.headingLg}>Noteworthy Projects</h2>
            {projects.map(project => {
                return (<article>
                    <h3>{project.name}</h3>
                    <div>
                        {project.year}
                    </div>
                    <p>{project.slug}</p>
                    <Link href={routes.project(project.id)}>
                        Read More
                    </Link>
                    
                </article>)
            })}
        </section>
    )
}
