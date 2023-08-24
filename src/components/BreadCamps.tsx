const BreadCamps = ({ titlePage }: { titlePage: string }) => {
  const pageName: string = `-> ${titlePage}`;
  return (
    <div className="bread-camps">
      <a href="/">High voltage</a> {pageName}
    </div>
  );
};

export default BreadCamps;
