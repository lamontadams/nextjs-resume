import Layout from "../components/layout"
import { GetStaticProps } from "next";
import Experience from "../components/experience";
import { SkillDataByCategory } from "../models/skillDataByCategory";
import { getAllSkillsByCategory } from "../lib/skills";
import { getKeys } from "../lib/utils";
import { EmploymentData } from "../models/employmentData";
import { getEmploymentByDate } from "../lib/employment";
import SkillsByCategory from "../components/skillsByCatgory";
import { PersonalData } from "../models/personalData";
import { getPersonalData } from "../lib/personal";
import { getEducationByDate } from "../lib/eduction";
import { EducationData } from "../models/educationData";
import Education from "../components/education";
import { isNil } from "lodash";

interface Props {
    skillsByCategory: SkillDataByCategory;
    categories: string[];
    experience: EmploymentData[];
    personal: PersonalData;
    education: EducationData[];
}

export default function Home({ categories, skillsByCategory, experience, personal, education }: Props) {
    return (
        <Layout home personal={personal}>
            
            <section className="experience section-padding">
                <div className="container">
                    <Experience experience={experience}/>
                    <SkillsByCategory categories={categories} skillsByCategory={skillsByCategory} />
                    {(!isNil(education) && <Education education={education} />)}
                    
                </div>
            </section>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async context => {
    const skillsByCategory = await getAllSkillsByCategory();
    const categories = getKeys(skillsByCategory).sort();
    const experience = await getEmploymentByDate()
    const personal = await getPersonalData();
    const education = await getEducationByDate();
    return {
        props: {
            skillsByCategory,
            categories, 
            experience,
            personal,
            education
        }
    }
}