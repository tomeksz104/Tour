"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/useToast";

import Input from "@/components/Input";
import Label from "@/components/Label";
import InputError from "@/components/InputError";
import Button from "@/components/Button";

import FacebookIcon from "@/public/facebook.svg";
import InstagramIcon from "@/public/instagram.svg";
import TwitterIcon from "@/public/twitter.svg";
import YoutubeIcon from "@/public/youtube.svg";
import { updateSocialMediaLinks } from "@/utils/socialMediaHelper";

const icons = {
  Facebook: <FacebookIcon className="w-4 h-4" />,
  Instagram: <InstagramIcon className="w-4 h-4" />,
  Twitter: <TwitterIcon className="w-4 h-4" />,
  YouTube: <YoutubeIcon className="w-4 h-4" />,
};

const tabs = ["profile", "socialmedia", "password"];

const Settings = ({ socialMediaPlatforms }) => {
  const {
    data: session,
    status,
    update,
  } = useSession({
    required: true,
  });
  const toast = useToast();
  const [error, setError] = useState(false);
  const [tab, setTab] = useState(tabs[0]);
  const [username, setUsername] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [aboutme, setAboutme] = useState("");

  const [socialMediaLinks, setSocialMediaLinks] = useState({});

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassowrd, setConfirmNewPassword] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      if (session.user.socialMedia && session.user.socialMedia.length > 0) {
        const updatedLinks = {};

        session.user.socialMedia.forEach((media) => {
          updatedLinks[media.platformId] = media.link;
        });

        setSocialMediaLinks(updatedLinks);
      }

      setUsername(session?.user?.username);
      setFirstName(session?.user?.firstName);
      setLastName(session?.user?.lastName);
      setAboutme(session?.user?.aboutme);
    }
  }, [session, status]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    setError(false);

    try {
      let requestBody = {};

      if (tab === tabs[0]) {
        requestBody = {
          userId: session.user._id,
          username: username,
          firstName: firstName,
          lastName: lastName,
          aboutme: aboutme,
        };
      } else if (tab === tabs[1]) {
        requestBody = {
          userId: session.user._id,
          socialMediaLinks: socialMediaLinks,
        };
      } else if (tab === tabs[2]) {
        requestBody = {
          userId: session.user._id,
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassowrd,
        };
      }

      const response = await fetch(`/api/user/update`, {
        method: "PATCH",
        body: JSON.stringify({
          tab,
          requestBody,
        }),
      });

      if (response.ok) {
        let socialMedia = {};
        if (Object.keys(socialMediaLinks).length > 0) {
          socialMedia = updateSocialMediaLinks(
            session?.user?.socialMedia,
            socialMediaLinks
          );
        }

        await update({
          ...session,
          user: { ...session?.user, ...requestBody, socialMedia },
        });

        const message = await response.json();
        toast.success(message);
      } else {
        const { error } = await response.json();
        setError(error);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleChangeTab = (tab) => {
    setError(false);
    setTab(tab);
  };

  const handleSocialMediaChange = (platformId, newLink) => {
    setSocialMediaLinks((prevLinks) => ({
      ...prevLinks,
      [platformId]: newLink,
    }));
  };

  return (
    <>
      <div className="w-full sm:max-w-3xl m-auto py-20 px-6">
        <h2 className="text-center text-2xl font-bold text-gray-800 md:text-4xl">
          Ustawienia konta
        </h2>

        <form className="space-y-4">
          {/* Profile Tab */}

          <div className="bg-white border rounded-md mt-10">
            <p className="pl-5 py-3 text-md font-semibold text-gray-800 border-b">
              Profil
            </p>
            <div className="px-5 py-4 space-y-5">
              <div className="space-y-1">
                <Label htmlFor="username">Nazwa użytkownika</Label>
                <Input
                  id="username"
                  type="text"
                  value={username || ""}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="username"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={session?.user.email ?? ""}
                  disabled
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="firstname">Imię</Label>
                <Input
                  id="firstname"
                  type="text"
                  value={firstName || ""}
                  onChange={(event) => setFirstName(event.target.value)}
                  placeholder="firstname"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastname">Nazwisko</Label>
                <Input
                  id="lastname"
                  type="text"
                  value={lastName || ""}
                  onChange={(event) => setLastName(event.target.value)}
                  placeholder="lastname"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="aboutme">O mnie</Label>
                <Input
                  id="aboutme"
                  type="text"
                  value={aboutme || ""}
                  onChange={(event) => setAboutme(event.target.value)}
                  placeholder="aboutme"
                />
              </div>
            </div>
          </div>

          {/* Social Media Tab */}
          <div className="bg-white border rounded-md mt-10">
            <p className="pl-5 py-3 text-md font-semibold text-gray-800 border-b">
              Social media
            </p>
            <div className="px-5 py-4 space-y-5">
              {socialMediaPlatforms.map((platform) => (
                <div key={platform.id} className="flex flex-col gap-1">
                  <Label htmlFor={platform.name}>{platform.name}</Label>
                  <Input
                    id={platform.name}
                    type="text"
                    value={socialMediaLinks[platform.id] || ""}
                    onChange={(event) =>
                      handleSocialMediaChange(platform.id, event.target.value)
                    }
                    icon={icons[platform.name]}
                    placeholder="https://www.facebook.com/yourname"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Password Tab */}

          <div className="bg-white border rounded-md mt-10">
            <p className="pl-5 py-3 text-md font-semibold text-gray-800 border-b">
              Zmiana hasła
            </p>
            <div className="px-5 py-4 space-y-5">
              <div className="space-y-1">
                <Label htmlFor="oldPassword">Stare hasło</Label>
                <Input
                  id="oldPassword"
                  type="password"
                  value={oldPassword}
                  onChange={(event) => setOldPassword(event.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="newPassword">Nowe hasło</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirmNewPassword">Powtórz nowe hasło</Label>
                <Input
                  id="confirmNewPassword"
                  type="password"
                  value={confirmNewPassowrd}
                  onChange={(event) =>
                    setConfirmNewPassword(event.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <InputError messages={[error]} className="mt-2" />

          <Button
            type="button"
            className="w-full"
            onClick={handleUpdateProfile}
          >
            Aktualizuj
          </Button>
        </form>
      </div>
    </>
  );
};

export default Settings;

const Dot = () => {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-[-2.20rem] z-[1] mx-auto h-6 w-6 scale-0 rounded-full border-8 border-white bg-green-500 transition scale-100 sm:inset-y-0 sm:right-[-2.70rem] sm:my-auto sm:mr-0"
    ></div>
  );
};
