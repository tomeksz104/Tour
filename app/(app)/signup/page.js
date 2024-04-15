import RegisterForm from "@/components/Auth/RegisterForm";

export const metadata = {
  title: "Rejestracja - WeekendowaWycieczka",
  description: "Zarejestruj swoje konto w WeekendowaWycieczka.",
  robots: {
    index: false,
    follow: false,
  },
};

function Register() {
  // const router = useRouter();

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (session?.user?.email) {
  //       router.push("/");
  //     }
  //   });
  // }, [router]);

  return <RegisterForm />;
}

export default Register;
