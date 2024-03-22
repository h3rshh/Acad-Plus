import React, { useEffect, useState } from 'react'
import Footer from 'components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from 'services/apiConnector';
import { categories } from 'services/apis';
import { getCatalogaPageData } from 'services/operations/pageAndComponentData';
import CourseCardCatalog from 'components/core/Catalog/CourseCardCatalog';
import CourseSlider from '../components/core/Catalog/CourseSlider'

const Catalog = () => {

   const {catalogName} = useParams();
   const [catalogPageData, setCatalogPageData] = useState(null);
   const [categoryId, setCategoryId] = useState("");

   // Fetch All Categories
   useEffect(() => {
      const getCategories = async() => {
         const res = await apiConnector("GET", categories.CATEGORIES_API);
         const category_id = res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id; 
         setCategoryId(category_id);
      }
      getCategories();
   } , [catalogName])

   useEffect( () => {
      const getCategoryDetails = async() => {
         try{
            const res = await getCatalogaPageData(categoryId);
            setCatalogPageData(res)
         }
         catch(error){
            console.log(error)
         }
         getCategoryDetails()
      }
   }, [categoryId])

  return (
    <div className='text-white'>

      <div>
         <p>{`Home / Catalog / `}<span>{catalogPageData?.data?.selectedCategory?.name}</span></p>
         
         <p>{catalogPageData?.data?.selectedCategory?.name}</p>
         <p>{catalogPageData?.data?.selectedCategory?.description}</p>
      </div>

      <div>

         {/* Section1 */}
         <div className=''>

            <div>Courses To Get You Started</div>

            <div className='flex gap-x-3'>
               <p>Most Popular</p>
               <p>New</p>
            </div>

            <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />

         </div>

         {/* Section2 */}
         <div>

            <p>Top Courses in {catalogPageData?.data?.selectedCategory?.name}</p>
            <div>
               <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
            </div>

         </div>

         {/* Section3 */}
         <div className=''>

            <p>Frequently Bought Together</p>

            <div className='py-8'>

               <div className='grid grid-cols-1 lg:grid-cols-2'>
                  {
                     catalogPageData?.data?.mostSellingCourses?.slice(0, 4)
                     .map((course, index) => {
                        <CourseCardCatalog course={course} key={index} height={"h-[400px]"} />
                     })
                  }
               </div>
            </div>

         </div>

         <Footer />

      </div>

    </div>
  )
}

export default Catalog