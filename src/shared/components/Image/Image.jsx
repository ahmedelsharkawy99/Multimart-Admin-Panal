const Image = (props) => {
  return <img {...props} loading="lazy" decoding="async" />;
};

export default Image;
