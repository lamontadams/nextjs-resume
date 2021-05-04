import Skills from "./skills";
import { SkillDataByCategory } from '../models/skillDataByCategory';

interface Props {
    skillsByCategory: SkillDataByCategory;
    categories: string[];
}

export default function SkillsByCategory({ skillsByCategory, categories }: Props) {
    const sorted = categories.sort((a,b) => {
        if(skillsByCategory[a].length > skillsByCategory[b].length) {
            return -1;
        } else {
            return 1;
        }
    })
    return (
        <div className="clearfix skills-by-category">
            <h3 className="experience-title">Skills</h3>
            {sorted.map(category => 
                (
                    <div className="section-wrapper clearfix">
                        <h4>{category}</h4>
                        <Skills skills={skillsByCategory[category]} />
                    </div>
                
                )
            )}
        </div>

    );
}