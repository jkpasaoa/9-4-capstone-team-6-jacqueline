import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useViewportScroll } from 'framer-motion';
import JosephPhoto from '../../../assets/Joseph.jpg';
import RaydelysPhoto from '../../../assets/Raydelys.jpg';
import JacquelinePhoto from '../../../assets/Jacqueline.jpg';
import MarkPhoto from '../../../assets/Mark.jpg';
import githubJPEG from '../../../assets/github.jpeg';
import linkedinPNG from '../../../assets/linkedin.png';
import marker from '../../../assets/markerSite.png'
import '../About/About.css';

function About() {

  const teamMembers = [
    {
      name: "Joseph Rodriguez",
      photo: JosephPhoto,
      bio: `I am Joseph Rodriguez, a compassionate and driven junior full stack developer. With a passion for technology and empathy for users, I excel in creating innovative solutions. Continuously seeking growth and learning, I aim to make a positive impact in the ever-changing world of software development.`,
      github: "https://github.com/jRodriguezIV",
      linkedin: "https://www.linkedin.com/in/josephrodrigueziv/",
    },

    {
      name: "Mark Roberston",
      photo: MarkPhoto,
      bio: `I'm currently a Full Stack Web Development Fellow at Pursuit, a 12-month, Google-funded software engineering fellowship with a 9% acceptance rate. I also enjoy movies, Formula 1, travel, and playing with my German Shepherd.

          With financial markets experience and would enjoy working for a financial firm.`,

      github: "https://github.com/MarkRobertson67",
      linkedin: "https://www.linkedin.com/in/mark-robertson-ny-uk/",
    },

    {
      name: "Raydelys M. Reyes",
      photo: RaydelysPhoto,
      bio: `Presently, I hold the title of a Full Stack Web Development Fellow at Pursuit, a prestigious 12-month software engineering fellowship with funding from Google. With an acceptance rate of just 9%.

         My ultimate goal is to become a skilled software engineer capable of tackling real-world challenges.`,
      github: "https://github.com/arerimr",
      linkedin: "https://www.linkedin.com/in/raydelysmr",
    },

    {
      name: "Jacqueline Pasaoa",
      photo: JacquelinePhoto,
      bio: `I am a full stack developer that studied under Pursuit. I underwent comprehensive training to master both front-end and back-end technologies. I love to travel, eat ice cream, and to learn more coding languages. I hope to travel to more cities from my travel bucketlist in the near future.`,
      github: "https://github.com/jkpasaoa",
      linkedin: "https://www.linkedin.com/in/jacquelinepasaoa/",
    },
  ];
  const { scrollY } = useViewportScroll();

  const scrollContainerRef = useRef(null);
  const scrollControls = useAnimation();

  useEffect(() => {
    const scrollTrigger = 200;

    const handleScroll = () => {
      if (scrollY.get() >= scrollTrigger) {
        scrollControls.start({ opacity: 1, y: 0 }); // animation when scrolled past the trigger point
      } else {
        scrollControls.start({ opacity: 0, y: 100 }); // Reset animation when not scrolled past the trigger point
      }
    };

    scrollY.onChange(handleScroll);

    return () => {
      scrollY.clearListeners();
    };
  }, [scrollControls, scrollY]);

  return (
    <div className="home-content flex justify-center items-center about-background">
      <div className="container mx-auto px-4">
        <div className="about">
          <div className="app-summary-container bg-cyan-200 rounded-lg">
            <p className='text-lg'>
              <img src={marker} alt="markerPin" className="markerPin" />&nbsp;&nbsp;&nbsp;
              <strong className="luxury-font font-size">City Whisperer</strong>&nbsp; introduced in August and September 2023 as a capstone project, redefines the way travelers experience cities. This app empowers tourists with pre-planned walking routes and points of interest, complemented by audio commentary, facilitating efficient and immersive city exploration. By providing valuable insights and a user-friendly interface, City Whisperer enhances the overall travel experience, enabling users to make the most of their visits while enjoying the freedom of self-guided tours. It's the perfect companion for travelers seeking both convenience and adventure on their journeys.</p>
            <br />
            <p className='text-lg'>
              <img src={marker} alt="markerPin" className="markerPin" />&nbsp;&nbsp;&nbsp;
              <strong className="luxury-font font-size">The Features</strong>&nbsp;of City Whisperer include AI-generated walking tours, customizable filters, and seamless Google Maps integration, you can explore cities like never before. Enjoy audio commentary in multiple languages through Text-to-Speech (TTS) and experience secure and convenient login options.</p>
            <br />
            <p className='text-lg'>
              <img src={marker} alt="markerPin" className="markerPin" />&nbsp;&nbsp;&nbsp;
              <strong className="luxury-font font-size">Our Mission</strong>&nbsp; is to empower travelers to experience cities like never before. We believe in enhancing the journey by offering self-guided walking tours that are not only informative but also deeply personalized. Our goal is to provide users with the freedom to explore at their own pace, uncover hidden gems, and connect with the culture and history of the places they visit. We're dedicated to curating an ever-growing library of AI-generated tours, fostering a sense of discovery, and making travel more accessible and enriching for everyone. City Whisperer is on a mission to redefine city exploration, one step at a time.</p>
            <br />
            <p className='text-lg'>
              <img src={marker} alt="markerPin" className="markerPin" />&nbsp;&nbsp;&nbsp;
              <strong className="luxury-font font-size">Our Development Team</strong>&nbsp; is a dynamic and passionate group of full-stack developers, each bringing their unique skills and backgrounds to the project. Together, this dedicated team is committed to redefining city exploration through AI-generated walking tours, making travel more enriching and accessible for all.
            </p>
          </div>
        </div>
        <div className="team-container flex flex-col items-center">
          <img src={marker} alt="markerPin" className="markerPin" />&nbsp;
          <h1 className="font-bold text-xl text-center my-0 dancing-script text-blue-950">
            Meet the Team</h1>
          <br />
          <br />
          <div className="team-members mt-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member-card">
                <h5 className="text-xl font-medium leading-tight text-neutral-800">
                  {member.name}
                </h5>
                <div className="mt-4 relative overflow-hidden bg-cover bg-no-repeat centered-photo">
                  <motion.img
                    className="rounded-t-lg medium-photo"
                    src={member.photo}
                    alt={member.name}
                    initial={{ opacity: 0, y: 100 }} // Initial animation state
                    animate={scrollControls} // the animation controls
                    transition={{ duration: 0.5 }} // Animation duration
                  />
                </div>
                <div className="p-4">
                  <div
                    ref={scrollContainerRef}
                    className="scrollable-content" //custom styling for scrolling content
                  >
                    <motion.p
                      className="text-base bio-paragraph text-black"
                      initial={{ opacity: 0, y: 100 }}
                      animate={scrollControls}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      style={{ textAlign: 'left' }}
                    >
                      {member.bio}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 100 }} // Initial animation state
                      animate={scrollControls} // animation controls
                      transition={{ duration: 0.5, delay: 0.4 }} // Animation duration and delay
                    >
                      <Link
                        to={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pointer-events-auto mr-5 inline-block cursor-pointer rounded text-base font-normal leading-normal text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
                      >
                        <img src={githubJPEG} alt="github Logo" width={36} />
                      </Link>
                      <Link
                        to={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pointer-events-auto inline-block cursor-pointer rounded text-base font-normal leading-normal text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
                      >
                        <img src={linkedinPNG} alt="LinkedIn Logo" width={40} />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
