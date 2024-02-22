import React from 'react'

const Stats = [
   {count: "5K", label: "Active Students"},
   {count: "100+", label: "Mentors"},
   {count: "200+", label: "Instructors"},
   {count: "50+", label: "Awards"},
]

export const StatsComponent = () => {

  return (
   <section className='text-white'>
      <div>
         <div>
            {
               Stats.map( (data, index) => {
                  return (
                     <div key={index  }>
                        <h1>{data.count}</h1>
                        <h2>{data.label}</h2>
                     </div>
                  )
                  } )
            }
         </div>
      </div>
   </section>
  )
}
