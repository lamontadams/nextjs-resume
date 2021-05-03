import { EmploymentData } from "../models/employmentData";
import DateRange from "./dateRange";
import Projects from "./projects";
import Skills from "./skills";

interface Props {
    experience: EmploymentData[]
}

export default function Experience({ experience } :Props) {
    return (
        <>
            <h3 className="experience-title">Experience</h3>
                <div className="experience-wrapper">
                {experience.map(job => {
                    const content = { __html: job.content };
                    return (<>
                    <div className="company-wrapper clearfix">
                        <h3 className="job-company experience-title">{job.company}</h3>
                        <div className="time">
                            <DateRange startDateString={job.start} endDateString={job.end} />
                        </div>
                    </div>
                    <div className="job-wrapper clearfix">
                        <h3 className="job-title experience-title">{job.title}</h3>
                        <div className="company-description">
                            <div dangerouslySetInnerHTML={content}></div>

                        </div>
                        <h4 className="job-skills experience-subtitle">Skills</h4>
                        <div className="experience-skills">
                            <Skills skills={job.skillData} />
                        </div>
                        {(job.projectData?.length > 0) && (
                            <>
                                <h4 className="job-projects experience-subtitle">Noteworthy Projects</h4>
                                <div className="experience-projects">
                                    <Projects projects={job.projectData}/>
                                </div>
                            </>
                        )}
                        
                    </div>
                </>)
                })}
            </div>
        </>
        
    );
}