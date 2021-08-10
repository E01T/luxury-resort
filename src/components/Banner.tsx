type props_type = {
  title: string,
  subtitle?: string,
  children: React.ReactChild | React.ReactChild []
}

const Banner = ({ title, subtitle, children }: props_type) => {
  return (
    <div className="banner">
      <h1>{title}</h1>
      <div />
      <p>{subtitle}</p>
      {children}
    </div>
  );
};

export default Banner;
