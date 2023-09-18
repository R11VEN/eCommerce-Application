import anton from '../assets/anton.jpg';
import maksim from '../assets/maksim.jpg';
import logo from '../assets/RSS-Logo.png';
import ruslan from '../assets/ruslan.jfif';
import { MemberProfile } from '../components/MemberProfile';

export const AboutUsPage = () => {
  const data = [
    {
      name: 'Maksim Komarov',
      role: 'Team Lead',
      github: 'https://github.com/R11VEN',
      img: maksim,
      bio: ' Maksim,  years old. Front end developer from Belarus',
      contirbutions:
        'Repository creation and documentation, allocating tasks on Project board, installing and configuring jest, Adding organized folder structure, Add registration & login page  layout, basic API functionality for creating a client, registration and authorization, creating store, registration & login integration, pagination, products sorting and filtering',
    },
    {
      name: 'Anton Shliaha',
      role: 'React Developer',
      github: 'https://github.com/AntonFartovii',
      img: anton,
      bio: ' Anton,  years old. Front end developer from Belarus',
      contirbutions:
        'React + Vite + TypeScript configuration, eslint prettier husky configuration, Create router, Create modal window, Redirect feature, User Profile Page, Authentication Page, basic store structure, product search feature',
    },

    {
      name: 'Ruslanbek Normurodov',
      role: 'Developer',
      github: 'https://github.com/ruslanbek92',
      img: ruslan,
      bio: ' Ruslanbek, 31 years old. Front end developer from Uzbekistan.  Except coding, He is likes to play football and reading',
      contirbutions:
        'Added basic components,form validation feature, Deatiled Product Page with Slider and Modal window,Catalog Page with Product Cards, Page 404, About Us Page, Retrieving Product info from API for Cards ',
    },
  ];
  return (
    <div className="about">
      <div className="about-container">
        <div className="team">
          <h2 className="team__heading">Development Team</h2>
          {data.map((item) => (
            <MemberProfile member={item} key={item.name}></MemberProfile>
          ))}
        </div>
      </div>
      <div className="colloboration">
        <h3 className="colloboration__heading">How we worked together</h3>
        <p className="colloboration__p">
          We divided each sprint into different parts and each of us finished one of the divided
          part independantly. This has helped us to work simultanously without worrying about
          repeating each other. Github's Kanban Board was a very handy tool for task allocation and
          management.Additionally, regular online meetups on discord audio channel helped us to
          clearify doubts and keep each other updated. Anton and Maksim worked usually at night
          while Ruslan coded mostly in the mornings. Discord discussions usually happened after noon
          as everybody was available mostly at that time of the day.Working with git and github
          helped us a lot in collarating smoothly and documenting our progress.
        </p>
      </div>
      <a href="https://rs.school/" className="logo-link" title="Go to RS School website">
        <img src={logo} alt="RSS logo" className="logo-link__img" />
      </a>
    </div>
  );
};
