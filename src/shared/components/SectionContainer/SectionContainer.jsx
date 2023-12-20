const SectionContainer = ({ children, sectionClass }) => {
  return (
    <section className={sectionClass}>
      <div className="container">
        <div className="row">{children}</div>
      </div>
    </section>
  );
};

export default SectionContainer;
