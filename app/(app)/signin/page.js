import LoginForm from "@/components/Auth/LoginForm";

export const metadata = {
  title: "Logowanie - WeekendowaWycieczka",
  description: "Zaloguj się do swojego konta w WeekendowaWycieczka.",
  robots: {
    index: false,
    follow: false,
  },
};

function Login() {
  // const router = useRouter();

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (session?.user?.email) {
  //       router.push("/");
  //     }
  //   });
  // }, [router]);

  return <LoginForm />;
}

export default Login;
