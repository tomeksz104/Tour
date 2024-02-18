import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer class="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" class="sr-only">
        Footer
      </h2>
      <div class="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div class="xl:grid xl:grid-cols-3 xl:gap-8">
          <div class="space-y-8">
            <Link
              href="/"
              className="flex justify-start shrink-0"
              aria-label="logo"
            >
              <Image
                width={233}
                height={83}
                className={"h-7 md:h-8 w-auto"}
                src={"/logo-dark.png"}
                alt="Tour logo"
                style={{
                  objectFit: "contain",
                }}
              />
            </Link>
            <p class="text-sm leading-6 text-gray-300">
              Idealne narzędzie dla każdego, kto chce odkryć piękno Polski w
              nowy sposób. Z nami każdy weekend może stać się niezapomnianą
              przygodą. Zacznij odkrywać już dziś!
            </p>
            <div class="flex space-x-6">
              <a href="#" class="text-gray-500 hover:text-gray-400">
                <span class="sr-only">Facebook</span>
                <svg
                  class="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" class="text-gray-500 hover:text-gray-400">
                <span class="sr-only">Instagram</span>
                <svg
                  class="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" class="text-gray-500 hover:text-gray-400">
                <span class="sr-only">Twitter</span>
                <svg
                  class="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" class="text-gray-500 hover:text-gray-400">
                <span class="sr-only">GitHub</span>
                <svg
                  class="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" class="text-gray-500 hover:text-gray-400">
                <span class="sr-only">YouTube</span>
                <svg
                  class="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div class="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 class="text-sm font-semibold leading-6 text-white">
                  Przeglądaj
                </h3>
                <ul role="list" class="mt-6 space-y-4">
                  <li>
                    <Link
                      href="/map"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                      aria-label="map"
                    >
                      🌍 Mapa atrakcji
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/place/new"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                      aria-label="Add place"
                    >
                      📌 Dodaj miejsce
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Kontakt
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Regulamin
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      O nas
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Polityka prywatności
                    </a>
                  </li>
                </ul>
              </div>
              <div class="mt-10 md:mt-0">
                <h3 class="text-sm font-semibold leading-6 text-white">
                  Województwa
                </h3>
                <ul role="list" class="mt-6 space-y-4">
                  <li>
                    <Link
                      href="/map?province=1"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Dolnośląskie
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/map?province=2"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Kujawsko-Pomorskie
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/map?province=3"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Lubelskie
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/map?province=4"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Lubuskie
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/map?province=5"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Łódzkie
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/map?province=6"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Małopolskie
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/map?province=7"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Mazowieckie
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/map?province=8"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Opolskie
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/map?province=9"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Podkarpackie
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/map?province=10"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Podlaskie
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/map?province=11"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Pomorskie
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/map?province=12"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Śląskie
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/map?province=13"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Świętokrzyskie
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/map?province=14"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Warmińsko-Mazurskie
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/map?province=15"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Wielkopolskie
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/map?province=16"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Zachodniopomorskie
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div class="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 class="text-sm font-semibold leading-6 text-white">
                  Miasta
                </h3>
                <ul role="list" class="mt-6 space-y-4">
                  <li>
                    <Link
                      href="/map?province=6&city=1611"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Kraków
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/map?province=7&city=2068"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Warszawa
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/map?province=1&city=284"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Wrocław
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/map?province=5&city=1431"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Łódź
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/map?province=11&city=3154"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Gdańsk
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/map?province=15&city=4394"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Poznań
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/map?province=16&city=4775"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Szczecin
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/map?province=2&city=410"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Bydgoszcz
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/map?province=3&city=798"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Lublin
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/map?province=12&city=3391"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Katowice
                    </Link>
                  </li>
                </ul>
              </div>
              <div class="mt-10 md:mt-0">
                <h3 class="text-sm font-semibold leading-6 text-white">Inne</h3>

                <ul role="list" class="mt-6 space-y-4">
                  <li>
                    <Link
                      href="/map?placeType=Atrakcja"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Atrakcje
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/map?placeType=Nocleg"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Noclegi
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/map?placeType=Jedzenie"
                      class="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Jedzenie
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-12 border-t border-white/10 pt-8 ">
          <p class="text-xs leading-5 text-gray-400">
            &copy; 2024 Tour - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
