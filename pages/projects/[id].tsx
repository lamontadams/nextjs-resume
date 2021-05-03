import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css'
import React from 'react';
import Skills from '../../components/skills';
import { pathsFromIds } from '../../lib/utils';
import { ProjectData } from '../../models/projectData';
import { getProjectData, getProjectIds } from '../../lib/projects';
import { PersonalData } from '../../models/personalData';
import { getPersonalData } from '../../lib/personal';

interface Props {
  projectData: ProjectData;
  personal: PersonalData;
}

export default function Project({ projectData, personal }: Props) {
  return (
    <Layout title={projectData.name} personal={personal}>
      <article>
        <h1 className={utilStyles.headingXl}>{projectData.name}</h1>
        <div>
          {projectData.year}
        </div>
        <div dangerouslySetInnerHTML={{ __html: projectData.content }} />
        <h3>Relevant Skills</h3>
        <Skills skills={projectData.skillData} />
        
        
      </article>
    </Layout>
  )
}


export async function getStaticPaths() {
  const ids = await getProjectIds();
  return {
    paths: pathsFromIds(ids),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const projectData = await getProjectData(params.id);
  const personal = await getPersonalData();
  return {
    props: {
      projectData,
      personal
    }
  }
}