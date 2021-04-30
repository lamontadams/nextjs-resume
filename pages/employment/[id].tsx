import Layout from '../../components/layout';
import DateRange from "../../components/dateRange";
import utilStyles from '../../styles/utils.module.css'
import { EmploymentData } from '../../models/employmentData';
import React from 'react';
import Skills from '../../components/skills';
import { getEmploymentData, getEmploymentIds } from '../../lib/employment';
import { pathsFromIds } from '../../lib/utils';

interface Props {
  employmentData: EmploymentData;
}

export default function Employment({ employmentData }: Props) {
  return (
    <Layout title={employmentData.company}>
      <article>
        <h1 className={utilStyles.headingXl}>{employmentData.title}</h1>
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
  return {
    props: {
      employmentData
    }
  }
}