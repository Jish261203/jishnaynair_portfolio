import { Projects } from "./projects";
import "./portfolio.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { CardContainer } from '../ui/3d-card';

const Portfolio = () => {
  return (
    <div className="portfolio-carousel">
      <h1 className="portfolio-title">Project Showcase</h1>
      <Swiper
        spaceBetween={40}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2000, // 4 seconds
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        grabCursor={true}
        speed={700} // smooth transition in ms
        modules={[Autoplay]}
        className="project-swiper"
        style={{ padding: '2rem 0' }}
      >
        {Projects.map((item) => (
          <SwiperSlide key={item.id}>
            <CardContainer>
              <div className="carousel-card-content">
                <img src={item.image} alt={item.title} className="masonry-img" />
                <h2>{item.title}</h2>
                <p>{item.desc}</p>
                <div className="tech">
                  {item.icons.map((icon, idx) => (
                    <img
                      key={idx}
                      src={icon.img}
                      alt={icon.name}
                      height={icon.height}
                      width={icon.width}
                      className="tech-icon"
                    />
                  ))}
                </div>
                <div className="button-container">
                  <a href={item.liveDemo} target="_blank" rel="noopener noreferrer" className="masonry-btn">Live Demo</a>
                  <a href={item.github} target="_blank" rel="noopener noreferrer" className="masonry-btn">GitHub</a>
                </div>
              </div>
            </CardContainer>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Portfolio;
	