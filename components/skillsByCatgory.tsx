import Skills from "./skills";
import { SkillDataByCategory } from '../models/skillDataByCategory';
import utilStyles from '../styles/utils.module.css'

interface Props {
    skillsByCategory: SkillDataByCategory;
    categories: string[];
}

export default function SkillsByCategory({ skillsByCategory, categories }: Props) {
    return (
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
            <h2 className={utilStyles.headingLg}>Skills</h2>
            {categories.map(category => 
                (<>
                <h3>{category}</h3>
                <Skills skills={skillsByCategory[category]} />
                </>)
            )}
        </section>
    );
}