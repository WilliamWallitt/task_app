import { motion } from "framer-motion";
import React from "react";
import styles from "~/pages/index.module.css";

export const Home = () => {
    return (
        <div className={styles.main}>
            <div className={`${styles.home_container}`}>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.2 }
                        }
                    }}
                    className={styles.home_container_content}>
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 }
                        }}
                        transition={{ duration: 0.4 }}
                        style={{fontSize: "16px"}}>Hi, my name is <span className={styles.home_experience_date}>William De Stanford</span>.
                        I am a ML researcher and a full
                        stack web developer at <span
                            className={styles.home_experience_date}>Hootsuite | discover.ai</span></motion.p>
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 }
                        }}
                        transition={{ duration: 0.4 }}
                        style={{fontSize: "16px"}}>I am responsible for developing ML solutions and the end-to-end web
                        development lifecycle across a diverse suite of 5+ AI products.</motion.p>
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 }
                        }}
                        transition={{ duration: 0.4 }}
                        style={{fontSize: "16px"}}>The tech stack I currently use is <span
                        className={styles.home_experience_date}>Python</span> (polars, tensorflow) for ML, <span
                        className={styles.home_experience_date}>C#</span> for backend development and <span
                        className={styles.home_experience_date}>Typescript</span> (React) for frontend development.
                    </motion.p>

                    <br/>
                    <br/>
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.4 }}
                        style={{fontSize: "16px"}}>Experience</motion.p>
                    <br/>
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.4 }}
                    ><i><span className={styles.home_experience_date}>October 2021 – Present</span> Hootsuite |
                        discover.ai - Software Engineer <span className={styles.home_experience_date}>London, UK</span></i>
                    </motion.p>
                    <motion.ul
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.4 }}
                    >
                        <li>Developed core features using C# (ASP.NET) and React (Typescript, Redux).</li>
                        <li>Implemented K-means clustering, PCA, and TensorFlow ranking models.</li>
                        <li>Redesigned machine learning pipeline, increasing accuracy by 21% (regression) and 13%
                            (classification).
                        </li>
                        <li>Deployed TensorFlow models with Azure and Docker, reducing costs by £2000/month.</li>
                        <li>Led transition from JavaScript to TypeScript, improving maintainability.</li>
                        <li>Automated SQL query conversion to fine-tuned models using Python.</li>
                    </motion.ul>

                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.4 }}
                    ><i><span className={styles.home_experience_date}>May 2020 – Aug 2021</span> FULL STACK
                        WEB-DEVELOPER - Freelance <span className={styles.home_experience_date}>London, UK</span></i>
                    </motion.p>
                    <motion.ul
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.4 }}
                    >
                        <li>Built web applications for clients, including dashboards and 3D interfaces.</li>
                        <li>Used React (Redux, Router), Node.js, Express.js, and Mongoose.</li>
                        <li>Employed REST microservices with NGINX for load balancing.</li>
                        <li>Integrated TensorFlow and Keras for machine learning applications.</li>
                        <li>Developed Shopify eCommerce stores with A/B testing for optimization.</li>
                    </motion.ul>

                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.4 }}><i><span className={styles.home_experience_date}>Jun – Sep 2019</span> SHAWS KENSINGTON –
                        Letting’s negotiator <span className={styles.home_experience_date}>London, UK</span></i></motion.p>
                    <motion.ul
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.4 }}>
                        <li>Managed property viewings and client recommendations.</li>
                        <li>Built a web app to match clients with available properties.</li>
                    </motion.ul>

                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.4 }}
                    ><i><span className={styles.home_experience_date}>Feb – Apr 2019</span> BROADWAY ASSET MANAGEMENT
                        LTD – Data analyst / Web developer <span
                            className={styles.home_experience_date}>London, UK</span></i></motion.p>
                    <motion.ul
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.4 }}>
                        <li>Performed data analysis on rental trends using Pandas and Scikit-learn.</li>
                        <li>Developed a rental property booking system with automated email alerts.</li>
                    </motion.ul>

                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.4 }}
                    ><i><span className={styles.home_experience_date}>Jul – Sep 2018</span> ELECTRO-CLINIC – Computer
                        and Phone Repair Technician <span className={styles.home_experience_date}>London, UK</span></i>
                    </motion.p>
                    <motion.ul
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.4 }}>
                        <li>Repaired computers and phones, improving service efficiency.</li>
                        <li>Developed an online ordering and remote servicing website.</li>
                    </motion.ul>

                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.4 }}><i><span className={styles.home_experience_date}>Sep – Oct 2017</span> CHRISTIES – Impressionist
                        and Modern Art Department Intern <span className={styles.home_experience_date}>London, UK</span></i>
                    </motion.p>
                    <motion.ul
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.4 }}>
                        <li>Researched and fact-checked new artwork for auctions.</li>
                        <li>Analyzed previous sale prices to estimate future auction values.</li>
                    </motion.ul>

                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.4 }}><i><span className={styles.home_experience_date}>Jul - Sep 2015, Aug – Sep 2014</span> BALDWIN
                        AND FRANCIS LTD – Electrical engineering Intern <span className={styles.home_experience_date}>Sheffield, UK</span></i>
                    </motion.p>
                    <motion.ul
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.4 }}>
                        <li>Learned embedded electronics and C++ programming.</li>
                        <li>Helped create a SCADA system for remote product monitoring.</li>
                        <li>Assisted the sales team with data analysis and presentations.</li>
                    </motion.ul>

                    {/*<p style={{fontSize: "18px"}}></p>*/}

                    {/*<img alt={"Programming Doggo"}*/}
                    {/*     src={"https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXJyMDlodnA4YWNicjJucmRjaG5lZTAyemMzZXQ1MXdkMW45MzgwNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Dh5q0sShxgp13DwrvG/giphy.gif"}/>*/}

                </motion.div>


            </div>
        </div>
    )
}