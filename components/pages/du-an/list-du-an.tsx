'use client';

import React from 'react'
import DuAnCard from './du-an-card'

interface IListDuAn {
  data: {projects: IProject[], totalItems: number}
}

const ListDuAn = ({data}: IListDuAn) => {
  return (
      <div className="grid grid-cols-fill-300 gap-3 m-2">
        {
          data.projects.map((project, idx) => (
            <DuAnCard key={idx} {...project} />
          ))}
      </div>
  )
}

export default ListDuAn