import DateRange from "./dateRange";
import { EducationData } from "../models/educationData";
import { isNil } from "lodash";

interface Props {
    education: EducationData[];
}

export default function Education({ education }: Props) {
    return (
        <div className="clearfix education">
            <h3 className="experience-title">Education &amp; Certifications</h3>
            {education.map(school => 
                (
                    <div className="section-wrapper clearfix">
                        <h4>{school.name}</h4>
                        {(!isNil(school.start) && !isNil(school.end)) && (
                            <div className="time">
                                <DateRange startDateString={school.start} endDateString={school.end} dateFormat="yyyy" />
                            </div>
                        )}
                        
                        {(!isNil(school.content)) && (
                            <div className="education-description">
                                <div dangerouslySetInnerHTML={{ __html: school.content}}></div>

                            </div>
                        )}
                        
                    </div>
                
                )
            )}
        </div>

    );
}