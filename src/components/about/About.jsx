/* eslint-disable react/no-unescaped-entities */
import './about.scss'

const About = () => {
    return (
			<section className="about">
				<h2>About</h2>
				<div className="content">
					<img src="/programmer.gif" alt="programmer" className="aboutImage" />
					<ul className="aboutItems">
						<li className="aboutList">
							<img src="/frontend.png" alt="frontend" />
							<div className='aboutContent'>
								<h3>Frontend Developer</h3>
								<p>
									Seasoned frontend developer specializing in crafting
									responsive, high-performance websites with precision and
									skill.
								</p>
							</div>
						</li>
						<li className="aboutList">
							<img src="/backend.png" alt="backend" />
							<div>
								<h3>Backend Developer</h3>
								<p>
									Proficient in designing efficient backend systems and APIs for
									optimal performance.
								</p>
							</div>
						</li>
						<li className="aboutList">
							<img src="/applicant.png" alt="applicant" />
							<div className='aboutContent'>
								<h3>Resume</h3>
								<button className='resumebtn'>Click here</button>
							</div>
						</li>
					</ul>
				</div>
			</section>
		);
}

export default About
