"use client"
import React from 'react'
import ModuleForm from '../../../compoennts/Module_form'
import { useParams } from 'next/navigation'


function page( { params }: { params: { id: string } }) {
  return (
    <div className='pt-[100px] mx-14'>
      <ModuleForm id={params.id}  />
    </div>
  )
}

export default page