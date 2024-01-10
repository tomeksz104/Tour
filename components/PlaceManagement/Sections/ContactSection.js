const { default: Input } = require("@/components/Input");
const { default: Label } = require("@/components/Label");

const ContactSection = ({ form }) => {
  return (
    <>
      <div className="space-y-2 border-t px-5 py-4">
        <Label htmlFor="phone">Numer telefonu</Label>
        <span className="block text-xs text-gray-500 italic">
          Podaj numer telefonu bezpośrednio do atrakcji.
        </span>
        <Input
          id="phone"
          name="phone"
          type="text"
          placeholder="+48 601 123 123"
          {...form.register("phone")}
        />
      </div>

      <div className="space-y-2 border-t px-5 py-4">
        <Label htmlFor="email">Email</Label>
        <span className="block text-xs text-gray-500 italic">
          Podaj adres email do atrakcji.
        </span>

        <Input
          id="email"
          name="email"
          type="email"
          placeholder="jan.kowalski@email.com"
          {...form.register("email")}
        />
      </div>

      <div className="space-y-2 border-t px-5 py-4">
        <Label htmlFor="website">Strona internetowa</Label>
        <span className="block text-xs text-gray-500 italic">
          Podaj stronę internetową do atrakcji.
        </span>
        <Input
          id="website"
          name="website"
          type="text"
          placeholder="www.adres-strony.pl"
          {...form.register("website")}
        />
      </div>
    </>
  );
};

export default ContactSection;
