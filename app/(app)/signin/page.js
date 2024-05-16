import LoginForm from "@/components/Auth/LoginForm";

export const metadata = {
  title: "Logowanie - ZnajdźAtrakcje",
  description: "Zaloguj się do swojego konta w ZnajdźAtrakcje",
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
