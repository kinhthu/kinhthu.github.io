import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  FaFacebookF, FaInstagram, FaTwitter, FaSkype, 
  FaLinkedinIn, FaHome, FaUserTie, FaGraduationCap, 
  FaRegEnvelope, FaCertificate, FaBriefcase,
  FaChevronRight, FaGithub, FaMedal, 
} from 'react-icons/fa';
import ReactTypingEffect from 'react-typing-effect';

import '../styles/index.scss';
import '../styles/styles.scss';
import avatarImg from '../assets/avatar.png'

import {Stack, Container, Row, Col, ProgressBar} from 'react-bootstrap';

const NavItems = [
  {name: 'Home', icon: <FaHome fontSize={24} />, iconActive: <FaHome fontSize={24} color="#149ddd"/>},
  {name: 'About', icon: <FaUserTie fontSize={24} />, iconActive: <FaUserTie fontSize={24} color="#149ddd"/>},
  {name: 'Education', icon: <FaGraduationCap fontSize={24} />, iconActive: <FaGraduationCap fontSize={24} color="#149ddd"/>},
  {name: 'Certificates', icon: <FaCertificate fontSize={24} />, iconActive: <FaCertificate fontSize={24} color="#149ddd"/>},
  {name: 'Experiences', icon: <FaBriefcase fontSize={24} />, iconActive: <FaBriefcase fontSize={24} color="#149ddd"/>},
  {name: 'Skill', icon: <FaMedal fontSize={24} />, iconActive: <FaMedal fontSize={24} color="#149ddd"/>},
  {name: 'Contact', icon: <FaRegEnvelope fontSize={24} />, iconActive: <FaRegEnvelope fontSize={24} color="#149ddd"/>},
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
  const [selectedItem, setItemSelected] = useState("Home");

  return (<Container fluid>
    <Row gu>
      <Col md={3} className="left-panel">
        <div className="user-info">
          <a href='https://kinhthu.github.io/'>
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
          {NavItems.map((item, index) => (
            <div className={`nav-item ${selectedItem === item.name && 'nav-item--active'}`} key={`nav-item__${index}`}>
              {selectedItem === item.name ? item.iconActive : item.icon} &nbsp;{item.name}
            </div>
          ))}
        </div>
      </Col>
      <Col md={9} className='right-panel'>
        <section className="intro">
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
        <section className='right-panel__content'>
          <h3 className='section__title'>About</h3>
          <p className='section__description'>{`I am a Front End developer with about ${new Date().getFullYear() - 2014} years of experience in designing and developing Web/Mobile applications and services.`}</p>
          <p className='section__description'>Experience in working with large companies (about 1000 employees) and some startup companies (from 10 to 50 members). Familiar with developing web applications using ReactJS / NextJS and mobile applications using React Native / Swift.</p>
          <p className='section__description'>I love to research new technologies and always look for new challenges to improve myself.</p>
          <br/>
          <Row>
            <Col md={4}>
              <img src={avatarImg} alt="avatar" className='section__avatar' />
            </Col>
            <Col md={8}>
              <h3 className='section__job'>Web & Mobile Developer</h3>
              <i><p>Passionate about designing and developing web and mobile applications.</p></i>
              <Row>
                {UserInfo.map((item, index) => (
                  <Col md={6} key={`user_info_${index}`} className="section__info__item">
                    <FaChevronRight color="#149ddd"/>
                    <span className="section__info__item__title">{item.title}:</span>
                    <span className="section__info__item__value">{item.value}</span>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </section>
        <section className="right-panel__education">
          <h3 className='section__title'>Education</h3>
          <Timeline items={[
            {time: "Sep 2010 - Sep 2014", title: "University of Science Ho Chi Minh City", description: "", content: <ul>
              <li>Bachelor of Science in Information Technology, <strong>Honor Program</strong></li>
              <li>GPA: 8.52</li>
            </ul>}
          ]} />
        </section>
        <section className="right-panel__certificates">
          <h3 className='section__title'>Certificates</h3>
          <Timeline items={Certificates} />
        </section>
        <section className="right-panel__experiences">
          <h3 className='section__title'>Experiences</h3>
          <Timeline items={Experiences} />
        </section>
        <section className='right-panel__skills'>
          <h3 className='section__title'>Skills</h3>
          <p className='section__description'>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
          <Row>
            {Skills.map((item, index) => (
              <Col md={6} key={`skill_${index}`} className="skill-item">
                <div className="skill-item__header">
                  <p className="skill-item__name">{item.title}</p>
                  <p className="skill-item__name">{item.value}%</p>
                </div>
                <ProgressBar now={item.value} animated style={{height: 10, borderRadius: 0}} />
              </Col>
            ))}
          </Row>
        </section>
      </Col>
    </Row>
  </Container>)
}

export default Home;
