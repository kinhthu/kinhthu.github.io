import React, {useEffect, useState, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  FaFacebookF, FaInstagram, FaTwitter, FaSkype, 
  FaLinkedinIn, FaHome, FaUserTie, FaGraduationCap, 
  FaRegEnvelope, FaCertificate, FaBriefcase,
  FaChevronRight, FaGithub, FaMedal, 
  FaMapMarkerAlt, FaMobileAlt, FaChevronUp,
  FaBars, FaTimes,
} from 'react-icons/fa';
import ReactTypingEffect from 'react-typing-effect';
import scrollTo from 'gatsby-plugin-smoothscroll';
import Fade from 'react-reveal/Fade';
import LightSpeed from 'react-reveal/LightSpeed';

import SEO from '../components/SEO';
import '../styles/index.scss';
import '../styles/styles.scss';
import avatarImg from '../assets/avatar.png'
import {isVisible} from '../utils/isVisible';

import {Stack, Container, Row, Col, ProgressBar, Form, Button, Offcanvas} from 'react-bootstrap';

const NavItems = [
  {link: 'home', name: 'Home', icon: FaHome},
  {link: 'about', name: 'About', icon: FaUserTie},
  {link: 'education', name: 'Education', icon: FaGraduationCap},
  {link: 'certificates', name: 'Certificates', icon: FaCertificate},
  {link: 'experiences', name: 'Experiences', icon: FaBriefcase},
  {link: 'skills', name: 'Skills', icon: FaMedal},
  {link: 'contact', name: 'Contact', icon: FaRegEnvelope},
];

const UserInfo = [
  {title: 'Fullname', value: 'Le Truong Kinh Thu'},
  {title: 'Birthday', value: '26 March 1992'},
  {title: 'Age', value: new Date().getFullYear() - 1992},
  {title: 'Gender', value: 'Male'},
  {title: 'Website', value: 'https://kinhthu.github.io'},
  {title: 'Degree', value: 'Bachelor of Science'},
  {title: 'Phone', value: '+84 375 734 347'},
  {title: 'Email', value: 'letruongkinhthu@gmail.com'},
  {title: 'Address', value: 'Ho Chi Minh, Vietnam'},
  {title: 'Hometown', value: 'DakLak province'},
];

const Skills = [
  {title: 'React JS', value: 90},
  {title: 'React Native', value: 80},
  {title: 'Next JS', value: 90},
  {title: 'HTML', value: 90},
  {title: 'CSS', value: 90},
  {title: 'SASS/LESS', value: 70},
  {title: 'Javascript', value: 80},
  {title: 'Node JS', value: 70},
  {title: '.NET', value: 50},
  {title: 'Java', value: 50},
  {title: 'Swift', value: 50},
  {title: 'Angular', value: 50},
  {title: 'Mongo DB', value: 60},
  {title: 'SQL Server', value: 50},
];

const Certificates = [
  {time: 'Jul-Aug 2013', description: 'On the job training certificate at the FPT Software.'},
  {time: 'Jan 2018', description: 'Microsoft Certificate: Developing ASP.NET MVC Web Applications.'},
];

const Experiences = [
  {time: 'Jun 2019 - Present', title: 'Launch Deck', description: 'Working as a Font End developer with web and Mobile Applications.', content: <div>
    <h5>Most important projects:</h5>
    <ul>
      <li><p><strong>Truckster</strong>: A big system used to connect customers with the food truck owner in the US. Help to order food, booking catering request, ...</p></li>
      <li><p><strong>Tickettamer</strong>:A system used to connect customer (who has ticket fines) with a law company (our client) to get a better deal for their ticket fines... </p></li>
      <li><p><strong>Restoration AI</strong>: A system used to manage house restoration. Customers will submit a form with issues about their house and the system will calculate the cost and assign workers to repair ... </p></li>
    </ul>
  </div>},
  {time: 'Jun 2017 - Jun 2019', title: 'Logix Technology Vietnam', description: 'Working as a Font End developer with web and Mobile Applications.', content: <div>
  <h5>Most important projects:</h5>
  <ul>
    <li><p><strong>Comvita Integration (for New Zealand client)</strong>: A management system used to integrate all available systems (with different technology) and help to transfer data between them.</p></li>
    <li><p><strong>Jelmoli Mobile Portal (for Switzerland client)</strong>: A portal application on mobile that helps users access Jelmoli Intranet Portal wherever with the Internet. The app was built using Ionic Framework which can be built for both iOS and Android devices. </p></li>
  </ul>
</div>},
  {time: 'May 2015 - Jun 2017', title: 'CSC Vietnam', description: 'Working as a Full Stack .NET developer', content: <h6>Working for an internal web application in a big system for managing medical documents from the Lab in Health Care</h6>},
];

const TimelineItem = ({time, title, description, content}) => {
  return <div className='timeline'>
    <h4 className='timeline__title'>{title}</h4>
    <div className='timeline__date'><i>{time}</i></div>
    <p className='timeline__description'>{description}</p>
    {content}
  </div>;
}

const Timeline = ({items}) => {
  return <div className='timeline__parent'>
    {items.map((item, index) => (<TimelineItem {...item} key={`timeline_${index}`} />))}
  </div>;
}

const Home = () => {
  const [selectedLink, setLink] = useState("Home");
  const [validated, setValidated] = useState(false);
  const [sections, setSections] = useState([]);
  const [showGoTopButton, setShowGoTopButton] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const contentRef = useRef(null);

  const checkVisibleSection = () => {
    sections.forEach(item => {
      if (isVisible(item.element)) {
        setLink(item.name);
      }
    })
  }

  const checkShowGoTopButton = () => {
    const top = contentRef.current?.scrollTop;
    if (top > 500) {
      setShowGoTopButton(true)
    } else {
      setShowGoTopButton(false);
    }
  }

  const handleScroll = e => {
    checkVisibleSection();

    checkShowGoTopButton();
  }

  const goToTop = () => {
    contentRef.current.scrollTo({top: 0, behavior: 'smooth'});
  }
  
  useEffect(() => {
    if (contentRef) {
      contentRef.current.addEventListener('scroll', handleScroll)
    }
  }, [contentRef, sections]);

  useEffect(() => {
    const home = document.getElementById('home');
    const about = document.getElementById('about');
    const education = document.getElementById('education');
    const certificates = document.getElementById('certificates');
    const experiences = document.getElementById('experiences');
    const skills = document.getElementById('skills');
    const contact = document.getElementById('contact');

    setSections([
      {name: 'Home', element: home},
      {name: 'About', element: about},
      {name: 'Education', element: education},
      {name: 'Certificates', element: certificates},
      {name: 'Experiences', element: experiences},
      {name: 'Skills', element: skills},
      {name: 'Contact', element: contact},
    ]);
  }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const name = form.elements.name.value;
      const email = form.elements.email.value;
      const subject = form.elements.subject.value;
      const message = form.elements.message.value;
      event.preventDefault();
      event.stopPropagation();

      window.open(`mailto:letruongkinhthu@gmail.com?subject=${subject}&body=${encodeURIComponent(message)}`, '_blank');
    }
    
    setValidated(true);
  };

  const onMenuClick = () => {
    setShowMenu(!showMenu);
  }

  const hideMenu = () => {
    setShowMenu(false);
  }

  const leftPanel = (<>
    <div className="user-info">
      <a href='https://kinhthu.github.io/' onClick={hideMenu} className='avatar-box'>
        <img src={avatarImg} alt="avatar" className="avatar" />
      </a>
      <h1 className='user-info__name'>Kinh Thu</h1>
      <Stack direction="horizontal" gap={3} className='user-info__social'>
        <a href='https://twitter.com/Kinh_Thu_' target="_blank" rel="noreferrer">
          <div className='social-icon'>
            <FaTwitter color='white'/>
          </div>
        </a>
        <a href='https://www.facebook.com/letruongkinhthu' target="_blank" rel="noreferrer">
          <div className='social-icon'>
            <FaFacebookF color='white'/>
          </div>
        </a>
        <a href='https://www.instagram.com/letruongkinhthu' target="_blank" rel="noreferrer">
          <div className='social-icon'>
            <FaInstagram color='white'/>
          </div>
        </a>
        <a href='https://join.skype.com/invite/esdfw0TgTHsX' target="_blank" rel="noreferrer">
          <div className='social-icon'>
            <FaSkype color='white'/>
          </div>
        </a>
        <a href='https://www.linkedin.com/in/letruongkinhthu' target="_blank" rel="noreferrer">
          <div className='social-icon'>
            <FaLinkedinIn color='white'/>
          </div>
        </a>
        <a href='https://github.com/kinhthu' target="_blank" rel="noreferrer">
          <div className='social-icon'>
            <FaGithub color='white'/>
          </div>
        </a>
      </Stack>
    </div>
    <div className="left-panel__navigation">
      {NavItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <Fade left key={`nav-item__${index}`} delay={index*100}>
            <div onClick={() => {
              hideMenu();
              setTimeout(() => {
                scrollTo(`#${item.link}`);
              }, 400)
            }} className={`nav-item ${selectedLink === item.name && 'nav-item--active'}`}>
              <Icon color={selectedLink === item.name ? '#149ddd' : '#a8a9b4'} size={24} /> &nbsp;&nbsp;{item.name}
            </div>
          </Fade>
        );
      })}
    </div>
  </>);

  return (<>
  <SEO 
    title="Hi! I'm Kinh Thu!" 
    description={"This is some information about Kinh Thu"}
    keywords={'Kinh Thu, Kinh Thu CV, Portfolio, Le Truong Kinh Thu'}  
  />
  <Container fluid>
      <Row>
        <Col lg={3} className="left-panel for-desktop">
          {leftPanel}
        </Col>
        <Col lg={9} md={12} className='right-panel' ref={contentRef}>
          <section className="intro" id="home">
            <h2 className="intro__name">Kinh Thu</h2>
            <h3 className='intro__job'>I'm&nbsp;
              <ReactTypingEffect
                speed={100}
                eraseSpeed={100}
                eraseDelay={1000}
                typingDelay={500}
                text={["Web Developer.", "Mobile Developer."]}
                className="intro__job--highlight"
              />
            </h3>
          </section>
          <section className='right-panel__content' id="about">
            <LightSpeed left>
              <h3 className='section__title'>About</h3>
            </LightSpeed>
            <Fade bottom delay={200}>
              <q><i>Do <strong>WHAT</strong> you <strong>LOVE</strong>, and <strong>LOVE</strong> what you <strong>DO</strong></i></q>
            </Fade>
            <Fade bottom delay={300}>
              <p className='section__description'>{`I am a Front End developer with about ${new Date().getFullYear() - 2014} years of experience in designing and developing Web/Mobile applications and services.`}</p>
            </Fade>
            <Fade bottom delay={400}>
              <p className='section__description'>Experience in working with large companies (about 1000 employees) and some startup companies (from 10 to 50 members). Familiar with developing web applications using ReactJS / NextJS and mobile applications using React Native / Swift.</p>
            </Fade>
            <Fade bottom delay={500}>
              <p className='section__description'>I love to research new technologies and always look for new challenges to improve myself.</p>
            </Fade>

            <br/>
            <Row>
              <Col md={4}>
                <Fade left delay={600}>
                  <img src={avatarImg} alt="avatar" className='section__avatar' />
                </Fade>
              </Col>
              <Col md={8}>
                <Fade right delay={600}>
                  <h3 className='section__job'>Web & Mobile Developer</h3>
                </Fade>
                <i>
                  <Fade right delay={800}>
                    <p>Passionate about designing and developing web and mobile applications.</p>
                  </Fade>
                </i>
                  <Row>
                    {UserInfo.map((item, index) => (
                      <Col lg={6} key={`user_info_${index}`} key={`info_${index}`}>
                        <Fade left delay={100*index + 1000}>
                          <div className="section__info__item">
                            <FaChevronRight color="#149ddd"/>
                            <span className="section__info__item__title">{item.title}:</span>
                            <span className="section__info__item__value">{item.value}</span>
                          </div>
                        </Fade>
                      </Col>
                    ))}
                  </Row>
              </Col>
            </Row>
          </section>
          <section className="right-panel__education" id="education">
            <LightSpeed left>
              <h3 className='section__title'>Education</h3>
            </LightSpeed>
            <Fade bottom>
              <Timeline items={[
                {time: "Sep 2010 - Sep 2014", title: "University of Science Ho Chi Minh City", description: "", content: <ul>
                  <li>Bachelor of Science in Information Technology, <strong>Honor Program</strong></li>
                  <li>GPA: 8.52</li>
                </ul>}
              ]} />
            </Fade>
          </section>
          <section className="right-panel__certificates" id="certificates">
            <LightSpeed left>
              <h3 className='section__title'>Certificates</h3>
            </LightSpeed>
            <Fade bottom>
              <Timeline items={Certificates} />
            </Fade>
          </section>
          <section className="right-panel__experiences" id="experiences">
            <LightSpeed left>
              <h3 className='section__title'>Experiences</h3>
            </LightSpeed>
            <Fade bottom>
              <Timeline items={Experiences} />
            </Fade>
          </section>
          <section className='right-panel__skills' id="skills">
            <LightSpeed left>
              <h3 className='section__title'>Skills</h3>
            </LightSpeed>
            <p className='section__description'>Below is my technical skills:</p>
            <Row>
              {Skills.map((item, index) => (
                <Col md={6} key={`skill_${index}`} className="skill-item">
                  <Fade left delay={100*index}>
                    <div className="skill-item__header">
                      <p className="skill-item__name">{item.title}</p>
                      {/* <p className="skill-item__name">{item.value}%</p> */}
                    </div>
                    <ProgressBar now={item.value} animated style={{height: 10, borderRadius: 0}} />
                  </Fade>
                </Col>
              ))}
            </Row>
          </section>
          <section className='right-panel__contact' id="contact">
            <LightSpeed left>
              <h3 className='section__title'>Contact</h3>
            </LightSpeed>
            <Fade left>
              <p className='section__description'>You can contact me with below information:</p>
            </Fade>
            <br />
            <Row>
              <Col md={5}>
                <Fade left>
                  <div className="contact-item">
                    <div className='contact-item__icon'>
                      <FaMapMarkerAlt color="#149ddd" size={24} />
                    </div>
                    <div className='contact-item__info'>
                      <h5>Location:</h5>
                      <p>290 An Duong Vuong, Ward 14, District 5</p>
                    </div>
                  </div>
                  <a href="mailto:letruongkinhthu@gmail.com" className="contact-item">
                    <div className='contact-item__icon'>
                      <FaRegEnvelope color="#149ddd" size={24} />
                    </div>
                    <div className='contact-item__info'>
                      <h5>Email:</h5>
                      <p>letruongkinhthu@gmail.com</p>
                    </div>
                  </a>
                  <a href="tel:+84375734347" className="contact-item">
                    <div className='contact-item__icon'>
                      <FaMobileAlt color="#149ddd" size={24} />
                    </div>
                    <div className='contact-item__info'>
                      <h5>Phone:</h5>
                      <p>+84 375 734 347</p>
                    </div>
                  </a>
                </Fade>
              </Col>
              <Col md={7}>
                <Fade right>
                  <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Form.Group as={Col} lg="6" controlId="name">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Your name"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} lg="6" controlId="email">
                        <Form.Label>Your Email</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="youremail@example.com"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Form.Group controlId="subject">
                      <Form.Label>Subject</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder=""
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <br/>
                    <Form.Group controlId="message">
                      <Form.Label>Message</Form.Label>
                      <Form.Control as="textarea" rows={5} required />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <div style={{textAlign: 'center', marginTop: 40}}>
                      <Button type="submit">Send Message</Button>
                    </div>
                  </Form>
                </Fade>
              </Col>
            </Row>
            <div className="contact-bottom-text">
              <q><i>Do <strong>WHAT</strong> you <strong>LOVE</strong>, and <strong>LOVE</strong> what you <strong>DO</strong></i></q>
            </div>
          </section>
        </Col>
      </Row>
      <Offcanvas show={showMenu} onHide={hideMenu}>
        <Offcanvas.Body>
          <div className="left-panel">
            {leftPanel}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <div className='mobile-menu' onClick={onMenuClick}>
        {showMenu ? <FaTimes size={24} color="white" /> : <FaBars size={24} color="white" />}
      </div>
      {showGoTopButton && (<div className='go-top-btn' onClick={goToTop}>
        <FaChevronUp size={24} color="white" />
      </div>)}
    </Container>
  </>)
}

export default Home;
