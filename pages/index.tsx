import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { GetStaticProps } from "next";
import Experience from "../components/experience";
import { SkillDataByCategory } from '../models/skillDataByCategory';
import { getAllSkillsByCategory } from '../lib/skills';
import { getKeys } from '../lib/utils';
import { EmploymentData } from '../models/employmentData';
import { getEmploymentByDate } from '../lib/employment';
import SkillsByCategory from '../components/skillsByCatgory';
import Projects from '../components/projects';
import { ProjectData } from '../models/projectData';
import { getProjectsByYear } from '../lib/projects';
import Site from "../data/site";

interface Props {
    skillsByCategory: SkillDataByCategory;
    categories: string[];
    experience: EmploymentData[];
    projects: ProjectData[];
}

export default function Home({ projects, categories, skillsByCategory, experience }: Props) {
    return (
        <Layout home>
            <section className={utilStyles.headingMd}>
                <p>{Site.Slug}</p>

            </section>
            <SkillsByCategory categories={categories} skillsByCategory={skillsByCategory} />
            <Experience experience={experience}/>
            <Projects projects={projects} />
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async context => {
    const skillsByCategory = await getAllSkillsByCategory();
    const categories = getKeys(skillsByCategory).sort();
    const experience = await getEmploymentByDate()
    const projects = await getProjectsByYear();
    return {
        props: {
            skillsByCategory,
            categories, 
            experience,
            projects
        }
    }
}