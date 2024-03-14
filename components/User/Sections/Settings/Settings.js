"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import Input from "@/components/Input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import FacebookIcon from "@/public/facebook.svg";
import InstagramIcon from "@/public/instagram.svg";
import TwitterIcon from "@/public/twitter.svg";
import YoutubeIcon from "@/public/youtube.svg";
import { updateSocialMediaLinks } from "@/utils/socialMediaHelper";
import { RotateCw } from "lucide-react";

const icons = {
  Facebook: <FacebookIcon className="w-4 h-4" />,
  Instagram: <InstagramIcon className="w-4 h-4" />,
  Twitter: <TwitterIcon className="w-4 h-4" />,
  YouTube: <YoutubeIcon className="w-4 h-4" />,
};

const Settings = ({ socialMediaPlatforms }) => {
  const {
    data: session,
    status,
    update,
  } = useSession({
    required: true,
  });
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);
    setError(false);

    try {
      const requestBody = {
        userId: session.user._id,
        username: username,
        firstName: firstName,
        lastName: lastName,
        aboutme: aboutme,
        socialMediaLinks: socialMediaLinks,
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassowrd,
      };

      const response = await fetch(`/api/user/update`, {
        method: "PATCH",
        body: JSON.stringify({
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
        setIsLoading(false);
        toast.success(message);
      } else {
        const { error } = await response.json();
        setIsLoading(false);
        toast.error(error);
        setError(error);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error);
      setError(error);
    }
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
                <Label
                  htmlFor="username"
                  className="text-sm font-semibold text-gray-600"
                >
                  Nazwa użytkownika
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username || ""}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="username"
                />
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-600"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={session?.user.email ?? ""}
                  disabled
                />
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="firstname"
                  className="text-sm font-semibold text-gray-600"
                >
                  Imię
                </Label>
                <Input
                  id="firstname"
                  type="text"
                  value={firstName || ""}
                  onChange={(event) => setFirstName(event.target.value)}
                  placeholder="firstname"
                />
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="lastname"
                  className="text-sm font-semibold text-gray-600"
                >
                  Nazwisko
                </Label>
                <Input
                  id="lastname"
                  type="text"
                  value={lastName || ""}
                  onChange={(event) => setLastName(event.target.value)}
                  placeholder="lastname"
                />
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="aboutme"
                  className="text-sm font-semibold text-gray-600"
                >
                  O mnie
                </Label>
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
                  <Label
                    htmlFor={platform.name}
                    className="text-sm font-semibold text-gray-600"
                  >
                    {platform.name}
                  </Label>
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
                <Label
                  htmlFor="oldPassword"
                  className="text-sm font-semibold text-gray-600"
                >
                  Stare hasło
                </Label>
                <Input
                  id="oldPassword"
                  type="password"
                  value={oldPassword}
                  onChange={(event) => setOldPassword(event.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="newPassword"
                  className="text-sm font-semibold text-gray-600"
                >
                  Nowe hasło
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="confirmNewPassword"
                  className="text-sm font-semibold text-gray-600"
                >
                  Powtórz nowe hasło
                </Label>
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

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button
            onClick={handleUpdateProfile}
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-500"
          >
            {isLoading ? (
              <RotateCw className="absolute mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Aktualizuj"
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default Settings;
