import React from 'react';
import { Link } from 'react-router-dom';
import '../About/About.css'
// import TeamMemberCard from "./TeamMemberCard";
import JosephPhoto from "../../../assets/Joseph.jpg"
import RaydelysPhoto from "../../../assets/Raydelys.jpg"
import JacquelinePhoto from "../../../assets/Jacqueline.jpg"
import MarkPhoto from "../../../assets/Mark.jpg"

function About() {

  const teamMembers = [
    {
      name: "Joseph Rodriquez",
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

  return (
    <div className="home-content flex justify-center items-center">
      <div>
        <div className="about">
          <h1 style={{ fontWeight: 'bold' }}>About the App: City Whisperer</h1>
          <br />
          <p>Overview:</p>
          <p>Summary of App, when it was made</p>
          <p>Features:</p>
          <p>Explain the App with Features</p>
          <p>Explain special things app can do compared to other existing apps</p>
          <p>Mission: What is the mission? what is it doing?</p>
          <p>About the Developers:</p>
          <p>
            City Whisperer is created by a team of dedicated individuals who firmly believe in the profound impact of...explain/describe the team
          </p>
        </div>
        <div className="team">
          <h1 className="font-bold text-xl">Meet the Team</h1>
          <div className="team-members mt-4 justify-center items-center">
            {teamMembers.map((member, index) => (
              <div key={index} className="block max-w-[17rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <div className="mt-8 relative overflow-hidden bg-cover bg-no-repeat">
                  <img
                    className="rounded-t-lg"
                    src={member.photo}
                    alt=""
                  />
                </div>
                <div className="p-6">
                  <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    {member.name}
                  </h5>
                  <p className="text-base text-neutral-600 dark:text-neutral-200">
                    {member.bio}
                  </p>
                </div>
                <div className="p-6">
                  <Link
                    type="button"
                    to={member.github}
                    className="pointer-events-auto mr-5 inline-block cursor-pointer rounded text-base font-normal leading-normal text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
                  >
                    Github
                  </Link>
                  <Link
                    type="button"
                    to={member.linkedin}
                    className="pointer-events-auto inline-block cursor-pointer rounded text-base font-normal leading-normal text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
                  >
                    Linkedin
                  </Link>
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