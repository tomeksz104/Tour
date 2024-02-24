const { default: Input } = require("@/components/Input");
import { Label } from "@/components/ui/label";

const ContactSection = ({ form, state }) => {
  return (
    <>
      <div className="space-y-2 border-t px-5 py-4">
        <Label htmlFor="phone" className="text-sm font-semibold text-gray-600">
          Numer telefonu
        </Label>
        <span className="block text-xs text-gray-500 italic">
          Podaj numer telefonu bezpośrednio do atrakcji.
        </span>
        <Input
          id="phone"
          name="phone"
          type="text"
          className="bg-gray-50"
          placeholder="+48 601 123 123"
          {...form.register("phone")}
        />
        {state?.errors?.phone &&
          state.errors.phone.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      <div className="space-y-2 border-t px-5 py-4">
        <Label htmlFor="email" className="text-sm font-semibold text-gray-600">
          Email
        </Label>
        <span className="block text-xs text-gray-500 italic">
          Podaj adres email do atrakcji.
        </span>

        <Input
          id="email"
          name="email"
          type="email"
          className="bg-gray-50"
          placeholder="jan.kowalski@email.com"
          {...form.register("email")}
        />

        {state?.errors?.email &&
          state.errors.email.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      <div className="space-y-2 border-t px-5 py-4">
        <Label
          htmlFor="website"
          className="text-sm font-semibold text-gray-600"
        >
          Strona internetowa
        </Label>
        <span className="block text-xs text-gray-500 italic">
          Podaj stronę internetową do atrakcji.
        </span>
        <Input
          id="website"
          name="website"
          type="text"
          className="bg-gray-50"
          placeholder="www.adres-strony.pl"
          {...form.register("website")}
        />
        {state?.errors?.website &&
          state.errors.website.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </>
  );
};

export default ContactSection;
