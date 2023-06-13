const AuthCard = ({ logo, children }) => (
  <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
    <div className="w-full sm:max-w-lg mt-6 p-3 sm:p-8 border bg-gray-50 overflow-hidden sm:rounded-3xl">
      {children}
    </div>
  </div>
);

export default AuthCard;
