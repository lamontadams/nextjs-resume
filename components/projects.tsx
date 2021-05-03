import { ProjectData } from "../models/projectData";

interface Props {
    projects: ProjectData[];
}

export default function Projects({ projects }: Props) {
    return <> 
        {projects.map(project => (
            <div className="project-wrapper clearfix">
                <h5 className="project-name experience-subtitle">{project.name} ({project.year})</h5>
                <div className="project-content" dangerouslySetInnerHTML={{ __html: project.content }}>
                </div>    
            </div>
        ))}
        </>
}
