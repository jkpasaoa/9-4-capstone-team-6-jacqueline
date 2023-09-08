import React, { useState, useEffect } from 'react';
import TourCard from './TourCard';
import axios from 'axios';
import { motion } from 'framer-motion';
import im from '../../assets/S_LogoWhite.png'

const API = process.env.REACT_APP_API_URL;

export default function TourIndex() {
    const [tours, setTours] = useState([])
    const [expandedIndex, setExpandedIndex] = useState(null)

    const handleCardClick = (index) => {
        setExpandedIndex(index === expandedIndex ? -1 : index)
    }

    const cardVariants = {
        expanded: {
            width: "400px"
        },
        collapsed: {
            width: "200px"
        }
    }

    useEffect(() => {
        axios.get(`${API}/tours`)
            .then((res) => setTours(res.data))
            .catch((e) => console.warn(e))
    }, [])

    useEffect(() => {
        console.log(tours)
    }, [tours])

    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <section className='py-16 pb-[300px] bg-gradient-to-r from-purple-800 to-indigo-800'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <h1 className='text-3xl font-extrabold text-white'>TOURS</h1>
                    <p className='mt-4 text-xl text-gray-300'></p>
                </div>
                <div className='mt-12 flex flex-col md:flex-row justify-center items-center gap-5'>
                    {
                        tours.map((tour, index) => {
                            return <motion.div
                                key={index}
                                className={`card cursor-pointer h-[500px] bg-cover bg-center rounded-[20px] ${index === expandedIndex ? 'expanded' : ''}`}
                                variants={cardVariants}
                                initial='collapsed'
                                animate={index === expandedIndex ? 'expanded' : 'collapsed'}
                                transition={{ duration: 0.5 }}
                                onClick={() => handleCardClick(index)}
                                style={{
                                    backgroundImage: `url(${im})`,
                                }}
                            >
                                <div className='card-content h-full flex flex-col justify-end'>
                                    <div className='card-footer rounded-b-[20px] bg-gray-800 bg-opacity-75 min-h-[100px] flex flex-col items-center justify-center'>
                                        <h2 className='text-xl font-semibold text-white text-center'>{tour.city}</h2>
                                        {index === expandedIndex && (
                                            <p className='mt-2 text-gray-300 text-center'>{<TourCard tour={tour} key={tour.id} />}</p>
                                        )

                                        }
                                    </div>

                                </div>
                            </motion.div>
                        })
                    }
                </div>
            </section>
        </div>
    )
}
