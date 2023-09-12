import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useViewportScroll } from 'framer-motion';
import JosephPhoto from '../../../assets/Joseph.jpg';
import RaydelysPhoto from '../../../assets/Raydelys.jpg';
import '../About/About.css';
import JacquelinePhoto from '../../../assets/Jacqueline.jpg';
import MarkPhoto from '../../../assets/Mark.jpg';
import githubJPEG from '../../../assets/github.jpeg'
import linkedinPNG from '../../../assets/linkedin.png'

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
      bio: `Jacqueline is full stack developer that studied under Pursuit. She underwent comprehensive training to master both front-end and back-end technologies. She loves to travel, eat ice cream, and wants to learn more coding languages. And hopes to add more cities to travel to in the near future.`,
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
    <div className="home-content flex justify-center items-center">
      <div>
        <div className="about">
          <div className="app-summary-container">
            <p><strong>City Whisperer</strong> introduced in August and September 2023 as a capstone project, redefines the way travelers experience cities. This app empowers tourists with pre-planned walking routes and points of interest, complemented by audio commentary, facilitating efficient and immersive city exploration. By providing valuable insights and a user-friendly interface, City Whisperer enhances the overall travel experience, enabling users to make the most of their visits while enjoying the freedom of self-guided tours. It's the perfect companion for travelers seeking both convenience and adventure on their journeys.</p>
            <p>Features:</p>
            <p>Explain the App with Features</p>
            <p>Explain special things app can do compared to other existing apps</p>
            <p>Mission: What is the mission? what is it doing?</p>
            <p>About the Developers:</p>
            <p>
              City Whisperer is created by a team of dedicated individuals who firmly believe in the profound impact of...explain/describe the team
            </p>
          </div>
        </div>
        <div className="team">
          <h1 className="font-bold text-xl">Meet the Team</h1>
          <div className="team-members mt-4 justify-center items-center">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member-card">
                <h5 className="text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
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
                  {/* <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    {member.name}
                  </h5> */}
                  <div
                    ref={scrollContainerRef}
                    className="scrollable-content" //custom styling for scrolling content
                  >
                    <motion.p
                      className="text-base text-neutral-600 dark:text-neutral-200 bio-paragraph"
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
                        className="pointer-events-auto mr-5 inline-block cursor-pointer rounded text-base font-normal leading-normal text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
                      >
                        <img src={githubJPEG} alt="github Logo" width={36} />
                      </Link>
                      <Link
                        to={member.linkedin}
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
