const Label = ({ className, children, ...props }) => (
  <label className={`${className} text-sm text-gray-600`} {...props}>
    {children}
  </label>
);

export default Label;
