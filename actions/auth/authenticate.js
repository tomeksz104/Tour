import { signIn } from "next-auth/react";

export async function authenticate(prevState, formData) {
  try {
    const response = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (response?.ok === false) {
      return {
        success: false,
        message: response?.error,
      };
    }

    return {
      success: true,
      message: "Zalogowano pomyślnie",
    };
  } catch (error) {
    return {
      success: false,
      message: "Coś poszło nie tak... Spróbuj ponownie później",
    };
  }
}
