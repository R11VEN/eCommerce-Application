export const Select = () => {
  const countries = ['Belarus'];
  return (
    <>
      <label htmlFor="select">Country</label>
      <select id="select">
        <option>Choose a country</option>
        {countries.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
};

export const SelectBilling = () => {
  const countries = ['Belarus'];
  return (
    <>
      <label htmlFor="selectBilling">Country *billing</label>
      <select id="selectBilling">
        <option>Choose a country</option>
        {countries.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
};
