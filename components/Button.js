const Button = ({ type = "submit", className, ...props }) => (
  //   <button
  //     type={type}
  //     className={`${className} inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150`}
  //     {...props}
  //   />
  <button
    type={type}
    className={`${className} w-full rounded-full bg-sky-500 dark:bg-sky-400 h-11 flex items-center justify-center px-6 py-3 transition hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800"><span class="text-base font-semibold text-white dark:text-gray-900`}
    {...props}
  />
);

export default Button;
