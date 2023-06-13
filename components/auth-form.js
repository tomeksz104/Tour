import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

function AuthForm() {
  const [registered, setRegistered] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredName = nameInputRef.current.value;

    // optional: Add validation

    if (isLogin) {
      // await signIn("credentials", {
      //   redirect: false,
      //   email: enteredEmail,
      //   password: enteredPassword,
      // });

      const response = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
        name: enteredName,
      });

      if ("error" in response) {
        // Obsługa błędu
        console.error(response.error);
        // Wyświetlenie informacji o błędzie dla użytkownika
      }
    } else {
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          body: JSON.stringify({ enteredEmail, enteredPassword }),

          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
      // try {
      //   const result = await createUser(enteredEmail, enteredPassword);
      //   setRegistered(true);
      // } catch (error) {
      //   console.log(error);
      // }
    }
  }

  return (
    <section className="max-w-xl mx-auto my-7">
      {!registered ? (
        <>
          <h1>{isLogin ? "Login" : "Sign Up"}</h1>
          <form onSubmit={submitHandler}>
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" ref={nameInputRef} />
            </div>
            <div>
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" required ref={emailInputRef} />
            </div>
            <div>
              <label htmlFor="password">Your Password</label>
              <input type="password" id="password" ref={passwordInputRef} />
            </div>
            <div className="my-5">
              <button className="button button-color mr-4">
                {isLogin ? "Login" : "Create Account"}
              </button>
              <button type="button" onClick={switchAuthModeHandler}>
                {isLogin ? "No Account? Create One" : "Already a user? Login"}
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="">
          <p>You have successfully registered!</p>

          <button
            onClick={() => router.reload()}
            className="button button-color"
          >
            Login Now
          </button>
        </div>
      )}
    </section>
  );
}

export default AuthForm;
