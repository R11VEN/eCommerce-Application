import classes from '../css/ui.module.css';
export const MemberProfile = ({
  member,
}: {
  member: {
    name: string;
    role: string;
    github: string;
    img: string;
    bio: string;
    contirbutions: string;
  };
}) => {
  return (
    <div className={classes.profile}>
      <img className={classes.profile__img} src={member.img}></img>
      <div className={classes.profile__info}>
        <h3 className={classes.profile__heading}>{member.name}</h3>
        <p className={classes.profile__p}>
          <span className={classes.profile__highlight}>Role</span> : {member.role}
        </p>
        <p className={classes.profile__bio}>
          <span className={classes.profile__highlight}>Bio</span> :{member.bio}
        </p>
        <p className={classes.profile__p}>
          <span className={classes.profile__highlight}>Contributions</span> : {member.contirbutions}
        </p>
        <a href={member.github} className={classes.profile__a}>
          Github profile
        </a>
      </div>
    </div>
  );
};
