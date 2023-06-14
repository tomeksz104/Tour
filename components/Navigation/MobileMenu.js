import "./MobileMenu.css";

const MobileMenu = ({
  isMobileMenuOpen,
  mobileMenuDismissed,
  handleDismissMobileMenu,
}) => {
  return (
    <div
      class={`mobile-menu ${
        mobileMenuDismissed ? "mobile-menu-dismissed" : ""
      } absolute inset-x-0 top-0 z-30 p-2 transition origin-top-right transform md:hidden`}
      style={{ display: isMobileMenuOpen ? "block" : "none" }}
    >
      <div class="bg-white divide-y-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-gray-50">
        <div class="px-5 pt-5 pb-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <img
                class="w-auto h-8 sm:h-10"
                src="https://slashapi.com/images/logo-64.png"
                alt=""
              />
              <span class="ml-2 text-2xl font-extrabold text-gray-700">
                SlashApi
              </span>
            </div>
            <div class="-mr-2">
              <button
                type="button"
                onClick={handleDismissMobileMenu}
                class="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span class="sr-only">Close menu</span>
                <svg
                  class="w-6 h-6"
                  x-description="Heroicon name: outline/x"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="mt-6">
            <nav class="grid gap-y-8">
              <a
                href="https://slashapi.com/collections"
                class="flex items-center p-3 -m-3 rounded-md hover:bg-gray-50"
              >
                <svg
                  class="flex-shrink-0 w-6 h-6 text-indigo-600"
                  x-description="Heroicon name: outline/chart-bar"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
                <span class="ml-3 text-base font-medium text-gray-900">
                  Collections
                </span>
              </a>

              <a
                href="https://slashapi.com/pricing"
                class="flex items-center p-3 -m-3 rounded-md hover:bg-gray-50"
              >
                <svg
                  class="flex-shrink-0 w-6 h-6 text-indigo-600"
                  x-description="Heroicon name: outline/cursor-click"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  ></path>
                </svg>
                <span class="ml-3 text-base font-medium text-gray-900">
                  Pricing
                </span>
              </a>

              <a
                href="https://slashapi.com/docs"
                class="flex items-center p-3 -m-3 rounded-md hover:bg-gray-50"
              >
                <svg
                  class="flex-shrink-0 w-6 h-6 text-indigo-600"
                  x-description="Heroicon name: outline/shield-check"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
                <span class="ml-3 text-base font-medium text-gray-900">
                  Documentation
                </span>
              </a>
            </nav>
          </div>
        </div>
        <div class="px-5 py-6 space-y-6">
          <div>
            <a
              href="https://app.slashapi.com/register"
              class="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
            >
              Sign up
            </a>
            <p class="mt-6 text-base font-medium text-center text-gray-500">
              Existing customer?
              <a
                href="https://app.slashapi.com/login"
                class="text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
