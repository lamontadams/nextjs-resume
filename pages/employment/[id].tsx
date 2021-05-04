import Layout from '../../components/layout';
import DateRange from "../../components/dateRange";
import { EmploymentData } from '../../models/employmentData';
import React from 'react';
import Skills from '../../components/skills';
import { getEmploymentData, getEmploymentIds } from '../../lib/employment';
import { pathsFromIds } from '../../lib/utils';
import { PersonalData } from '../../models/personalData';
import { getPersonalData } from '../../lib/personal';

interface Props {
  employmentData: EmploymentData;
  personal: PersonalData;
}

export default function Employment({ employmentData, personal }: Props) {
  return (
    <Layout title={employmentData.company} personal={personal}>
      <article>
        <h1>{employmentData.title}</h1>
        <h2>{employmentData.company}</h2>
        <div>
          <DateRange startDateString={employmentData.start} endDateString={employmentData.end} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: employmentData.content }} />
        <h3>Relevant Skills</h3>
        <Skills skills={employmentData.skillData} />
        
        <h3>Projects</h3>

      </article>
    </Layout>
  )
}


export async function getStaticPaths() {
  const ids = await getEmploymentIds();
  return {
    paths: pathsFromIds(ids),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const employmentData = await getEmploymentData(params.id)
  const personal = await getPersonalData();
  return {
    props: {
      employmentData,
      personal
    }
  }
}