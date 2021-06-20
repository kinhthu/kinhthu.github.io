module.exports = {
  siteTitle: 'Hi! I\'m Kinh Thu!',
  siteDescription: `This is some information about Kinh Thu`,
  keyWords: ['Kinh Thu', 'Kinh Thu CV', 'Portfolio', 'Le Truong Kinh Thu'],
  authorName: 'Kinh Thu',
  twitterUsername: 'Kinh_Thu_',
  githubUsername: 'kinhthu',
  authorAvatar: '/images/avatar.png',
  authorDescription: `<q><i>Do <strong>WHAT</strong> you <strong>LOVE</strong>, and <strong>LOVE</strong> what you <strong>DO</strong></i></q>.<br/><br/>
  I love programing and happy with creating webs and mobile apps, so I start to learn Programing in 2010 at the University of Science.<br/><br/>
  I graduated in Sep 2014 with A <i><strong>Bachelor of Science in Information Technology, Honors Program</strong></i> <strong style="color:#E1701A">(GPA: 8.52)</strong><br/><br/>

- In 2015 I started working as a .NET develop at CSC Vietnam (currently is DXC Technology Vietnam).<br/>
- In 2017, I started working as a frontend developer at Logix Technology with Angular and Ionic.<br/>
- And from 2019 to the present, I work as a frontend / mobile developer at Launch Deck and work with <strong>Javascript, ReactJS, NextJS and React Native</strong>.`,
  skills: [
    {
      name: 'HTML',
      level: 80
    },
    {
      name: 'CSS',
      level: 70
    },
    {
      name: 'Javascript',
      level: 70
    },
    {
      name: 'NodeJs',
      level: 40
    },
    {
      name: 'React',
      level: 70
    },
    {
      name: 'React Native',
      level: 60
    },
    {
      name: 'Git',
      level: 70
    },
    {
      name: 'Angular 4',
      level: 40
    },
    {
      name: '.Net',
      level: 40
    },
    {
      name: 'SQL Server',
      level: 40
    },
    /* more skills here */
  ],
  jobs: [
    /* more jobs here */
    {
      company: "Launch Deck LLC",
      begin: {
        month: 'Jun',
        year: '2019'
      },
      duration: null,
      occupation: "Frontend / Mobile developer",
      description: `I have responsibility for the development and maintenance of the <a href="https://gotruckster.com/" target="_blank">website</a> to order and request catering food trucks in the US. <br/><br/>
      Besides, I also implement and maintain some other projects for health care, <a href="https://tickettamer.com/" target="_blank">the law</a> by the web app and <a href="https://urgentadmin.com/preview" target="_blank">mobile app</a>.
      `
  
    },  {
      company: "Logix Technology Vietnam",
      begin: {
        month: 'Jun',
        year: '2017'
      },
      duration: "2 yrs",
      occupation: "Frontend developer",
      description: `I worked on Mulesoft Service Bus to integrate all available systems (with different technology) and help to transfer data between them.<br/><br/>
      Besides, I created a mobile application to manage honey from farm to laboratory.`
  
    }, {
      company: "CSC Vietnam",
      begin: {
        month: 'May',
        year: '2015'
      },
      duration: '2 yrs e 1 mo',
      occupation: ".Net developer",
      description: "Development and maintenance of the system using in the healthcare domain. It manages documents from the laboratory and hospital related to drugs and health"
    }, {
      company: "IDTEK SJC",
      begin: {
        month: 'Apr',
        year: '2013'
      },
      duration: '1 yr',
      occupation: "PHP Develop",
      description: "I worked as an internship and responsible on implement and maintain the system that used to manage a travel enterprise"
  
    },
  ],
  portifolio: [
    // {
    //   image: "/images/gatsby-starter-cv.png",
    //   description: "Gatsby starter CV template",
    //   url: "https://www.gatsbyjs.org/starters/santosfrancisco/gatsby-starter-cv/"
    // },
    // {
    //   image: "/images/awesome-grid.png",
    //   description: "Responsive grid for ReactJS",
    //   url: "https://github.com/santosfrancisco/react-awesome-styled-grid"
    // },
    /* more portifolio items here */
  ],
  social: {
    twitter: "https://twitter.com/Kinh_Thu_",
    linkedin: "https://www.linkedin.com/in/letruongkinhthu/",
    github: "https://github.com/kinhthu",
    email: "letruongkinhthu@gmail.com"
  },
  siteUrl: 'https://kinhthu.github.io',
  pathPrefix: '/', // Note: it must *not* have a trailing slash.
  siteCover: '/images/cover.jpeg',
  googleAnalyticsId: 'UA-000000001-1',
  background_color: '#ffffff',
  theme_color: '#25303B',
  fontColor: "#000000cc",
  enableDarkmode: true, // If true, enables dark mode switch
  display: 'minimal-ui',
  icon: 'src/assets/icon.png',
  headerLinks: [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Portifolio',
      url: '/portifolio',
    }
  ]
}