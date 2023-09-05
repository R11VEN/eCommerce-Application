import classes from '../layout/layout.module.css';

const BreadCamps = ({ titlePage }: { titlePage: string }) => {
  const pageName: string = `-> ${titlePage}`;
  return (
    <div className={classes['bread-camps']}>
      <a href="/">High voltage</a> {pageName}
    </div>
  );
};

export default BreadCamps;
