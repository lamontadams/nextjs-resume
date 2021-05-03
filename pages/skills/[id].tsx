import Link from "next/link";
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css'
import { EmploymentData } from '../../models/employmentData';
import { getEmploymentDataBySkill } from '../../lib/employment';
import { pathsFromIds } from '../../lib/utils';
import { SkillData } from '../../models/skillData';
import { ProjectData } from '../../models/projectData';
import { getSkill, getSkillIds } from '../../lib/skills';
import { getProjectsBySkill } from '../../lib/projects';
import routes from "../../lib/routes";
import { PersonalData } from "../../models/personalData";
import { getPersonalData } from "../../lib/personal";

interface Props {
  skill: SkillData;
  employmentData: EmploymentData[];
  projectData: ProjectData[];
  personal: PersonalData;
}

export default function Skills({ skill, employmentData, projectData, personal }: Props) {
  const workTitle = `Experience with ${skill.name}`;
  const projectTitle = `Projects featuring ${skill.name}`;
  let workElement;
  let projectElement;
  if(employmentData.length !== 0) {
    workElement = <> 
      <h2>{workTitle}</h2>
      <ul>
        {employmentData.map(job => {
          return <li key={job.id}>
            <Link href={routes.employment(job.id)}>
                  {job.company}
              </Link>
          </li>
        })}
      </ul>
    </>
  }
  if(projectData.length !== 0) {
    projectElement = <>
      <h2>{projectTitle}</h2>
        <ul>
          {projectData.map(project => {
            return <li key={project.id}>
              <Link href={routes.project(project.id)}>
                    {project.name}
                </Link>
            </li>
          })}
        </ul>
    </>
  }
  return (
    <Layout title={skill.name} personal={personal}>
      <article>
        <h1 className={utilStyles.headingXl}>{skill.name}</h1>
        <p>{skill.slug}</p>
        {workElement}
        {projectElement}
      </article>
    </Layout>
  )
}


export async function getStaticPaths() {
  const ids = await getSkillIds();
  return {
    paths: pathsFromIds(ids),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const employmentData = await getEmploymentDataBySkill(params.id);
  const projectData = await getProjectsBySkill(params.id);
  const skill = await getSkill(params.id);
  const personal = await getPersonalData();
  return {
    props: {
      skill,
      employmentData,
      projectData,
      personal
    }
  }
}