import React from 'react'
import HighLightText from 'components/core/HomePage/HighLightText'
import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'
import { Quote } from 'components/core/About/Quote'
import FoundingStory from '../assets/Images/FoundingStory.png'
import { StatsComponent } from "../components/core/About/StatsComponent"
import LearningGrid from 'components/core/LearningGrid'
import { ContactForm } from 'components/core/About/ContactForm'
import Footer from 'components/common/Footer' 

export const About = () => {



  return (

    <div className='mt-[100px] text-white w-11/12 max-w-maxContent mx-auto'>

      {/* Section 1 */}
      <section>
         <div>
            <header className='text-white'>
               Driving Innovation in Online Education for a 
               <HighLightText text={" Brighter Future "} />

               <p>
                  Acad Zenith is at the forefront of driving innovation in online education.
                  We're passionate about creating a brighter future by offering cutting edge courses,
                  leveraging emerging technologies, and nurturing a vibrant learning community
               </p>
            </header>

            <div className='flex flex-row'>
               <img src={BannerImage1}/>
               <img src={BannerImage2}/>
               <img src={BannerImage3}/>
            </div>
         </div>
      </section>


      {/* Section 2 */}
      <section>
         <div>
            <Quote/>
         </div>
      </section>

      {/* Section 3 */}
      <section className='flex flex-col'>

         {/* Founding Story Div */}
         <div className='flex'>

            {/* Founding Story Left box */}
            <div className='text-white'>
               <h1>Our Founding Story</h1>

               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci veniam eum hic id fuga minima veritatis minus amet, consectetur assumenda alias ducimus ipsam possimus placeat, explicabo dolores recusandae at dicta? Repudiandae ducimus sunt esse pariatur illum quasi recusandae, culpa dicta quae nostrum, corporis incidunt est inventore harum qui nobis vero.</p>

               <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod cumque dolorem similique, voluptas velit esse consequatur labore aut nobis iusto laboriosam ullam eos rerum error fugiat. Sapiente delectus possimus dignissimos. Suscipit delectus fugit quas facilis esse beatae molestiae? Voluptatum officia numquam quod voluptas facilis optio temporibus ad, ab quisquam nam!</p>

            </div>

            <div>
               <img src={FoundingStory}/>
            </div>
         </div>

         {/* Vision and Mission Div */}
         <div className='flex flex-row text-richblack-100'>

            <div>
               <h1>Our Vision</h1>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio fugit sequi ad eligendi quisquam accusantium minus voluptatibus, rerum recusandae expedita quas id? Sit error amet corrupti dolor porro obcaecati iure dolorum perspiciatis explicabo enim laboriosam cupiditate autem sapiente vero iusto eius, illum, voluptatibus assumenda aut reiciendis est nesciunt totam. Ipsa? </p>

            </div>

            <div>
               <h1>Our Mission</h1>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio fugit sequi ad eligendi quisquam accusantium minus voluptatibus, rerum recusandae expedita quas id? Sit error amet corrupti dolor porro obcaecati iure dolorum perspiciatis explicabo enim laboriosam cupiditate autem sapiente vero iusto eius, illum, voluptatibus assumenda aut reiciendis est nesciunt totam. Ipsa? </p>
            </div>

         </div>
      </section>


      {/* Section 4 */}
      <StatsComponent/>

      {/* Section 5 */}
      <section className='mx-auto flex flex-col items-center justify-between 
         gap-5 mb-[140px]'>
         <LearningGrid className="mx-auto"/>
         <ContactForm/>
      </section>

      <section>
         Reviews from other Members
      </section>

      <Footer/>
      
    </div>

  )
}
