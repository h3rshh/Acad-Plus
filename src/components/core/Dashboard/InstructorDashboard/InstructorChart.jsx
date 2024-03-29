import React, { useState } from 'react'
import { Chart, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(...registerables);

const InstructorChart = ({courses}) => {

   const [currChart, setCurrChart] = useState("students");

   const getRandomColors = (numColors) => {
      const colors = [];
      for(let i=0; i<numColors; i++){
         const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)} )`
         colors.push(color);
      }
      return colors;
   }

   // Create Data for Chart Displaying Student Info
   const chartDataStudents = {
      labels: courses.map((course) => course.courseName),
      datasets: [
         {
            data: courses.map((course) => course.totalStudentsEnrolled),
            backgroundColor: getRandomColors(courses.length)
         }
      ]
   }


   // Create Data for Chart Displaying Income Info
   const chartDataIncome = {
      labels: courses.map((course) => course.courseName),
      datasets: [
         {
            data: courses.map((course) => course.totalAmountGenerated),
            backgroundColor: getRandomColors(courses.length)
         }
      ]
   }


   // Create Options
   const options = {

   }

  return (
      <div>
      
         <p>Visualize</p>

         <div>
            <button onClick={() => setCurrChart("students")}
            >Student</button>

            <button onClick={() => setCurrChart("income" )}
            >Income</button>
         </div>

      </div>
  )
}

export default InstructorChart