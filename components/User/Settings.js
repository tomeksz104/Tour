"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/useToast";

import Input from "../Input";
import Label from "../Label";
import InputError from "../InputError";
import Button from "../Button";

import FacebookIcon from "@/public/facebook.svg";
import InstagramIcon from "@/public/instagram.svg";
import TwitterIcon from "@/public/twitter.svg";
import YoutubeIcon from "@/public/youtube.svg";

const tabs = ["profile", "socialmedia", "password"];

const Settings = () => {
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
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [youtube, setYoutube] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassowrd, setConfirmNewPassword] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      setUsername(session?.user?.username);
      setFacebook(session?.user?.facebook);
      setInstagram(session?.user?.instagram);
      setTwitter(session?.user?.twitter);
      setYoutube(session?.user?.youtube);
    }
  }, [status]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    setError(false);

    try {
      let requestBody = {};

      if (tab === tabs[0]) {
        requestBody = {
          userId: session.user._id,
          username: username,
        };
      } else if (tab === tabs[1]) {
        requestBody = {
          userId: session.user._id,
          facebook: facebook,
          instagram: instagram,
          twitter: twitter,
          youtube: youtube,
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
        await update({
          ...session,
          user: { ...session?.user, ...requestBody },
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

  return (
    <>
      <div className="w-full sm:max-w-4xl m-auto py-20">
        <h2 className="text-center text-2xl font-bold text-gray-800 md:text-4xl">
          Account Settings
        </h2>

        <div className="m-auto mt-12 items-center justify-center space-y-6 lg:flex lg:space-y-0 lg:space-x-6 xl:w-10/12">
          <div className="w-full relative sm:flex">
            <div className="mt-16 pb-20 sm:mt-0 sm:w-5/12 sm:pb-0">
              <div className="relative h-full before:absolute before:right-0 before:top-1 before:my-auto before:h-0.5 before:w-full before:rounded-full before:bg-gray-200 sm:pt-0 sm:before:inset-y-0 sm:before:h-[85%] sm:before:w-0.5">
                <div className="relative -mt-1 h-full overflow-x-auto sm:overflow-hidden pt-7 pb-6 sm:-mr-1 sm:pr-1">
                  <ul className="flex h-full w-max justify-center space-x-2 px-6 sm:w-full sm:flex-col sm:space-x-0 sm:space-y-6 sm:px-8">
                    <li
                      className="relative"
                      onClick={() => handleChangeTab(tabs[0])}
                    >
                      <label
                        className={`block cursor-pointer rounded-full bg-green-100 py-2 px-4 text-center text-green-800 ${
                          tab === tabs[0] &&
                          "text-green-500 ring-1 ring-green-500"
                        }`}
                      >
                        <span className="mx-auto text-sm font-semibold">
                          Profile
                        </span>
                      </label>
                      {tab === tabs[0] && <Dot />}
                    </li>
                    <li
                      className="relative"
                      onClick={() => handleChangeTab(tabs[1])}
                    >
                      <label
                        className={`block cursor-pointer rounded-full bg-green-100 py-2 px-4 text-center text-green-800 ${
                          tab === tabs[1] &&
                          "text-green-500 ring-1 ring-green-500"
                        }`}
                      >
                        <span className="mx-auto block w-max text-sm font-semibold">
                          Social Media
                        </span>
                      </label>
                      {tab === tabs[1] && <Dot />}
                    </li>
                    <li
                      className="relative"
                      onClick={() => handleChangeTab(tabs[2])}
                    >
                      <label
                        className={`block cursor-pointer rounded-full bg-green-100 py-2 px-4 text-center text-green-800 ${
                          tab === tabs[2] &&
                          "text-green-500 ring-1 ring-green-500"
                        }`}
                      >
                        <span className="mx-auto block w-max text-sm font-semibold">
                          Password
                        </span>
                      </label>
                      {tab === tabs[2] && <Dot />}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 pb-20 sm:w-7/12 sm:pb-8">
              <form className="space-y-8">
                {/* Profile Tab */}
                {tab === tabs[0] && (
                  <>
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
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        type="text"
                        value={username || ""}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="username"
                      />
                    </div>
                  </>
                )}

                {/* Social Media Tab */}
                {tab === tabs[1] && (
                  <>
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input
                        id="facebook"
                        type="text"
                        value={facebook}
                        onChange={(event) => setFacebook(event.target.value)}
                        icon={<FacebookIcon className="w-4 h-4" />}
                        placeholder="https://www.facebook.com/yourname"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instragram"
                        type="text"
                        value={instagram}
                        onChange={(event) => setInstagram(event.target.value)}
                        icon={<InstagramIcon className="w-4 h-4" />}
                        placeholder="https://instagram.com/yourname"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        type="text"
                        value={twitter}
                        onChange={(event) => setTwitter(event.target.value)}
                        icon={<TwitterIcon className="w-4 h-4" />}
                        placeholder="https://twitter.com/yourname"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="youtube">Twitter</Label>
                      <Input
                        id="youtube"
                        type="text"
                        value={youtube}
                        onChange={(event) => setYoutube(event.target.value)}
                        icon={<YoutubeIcon className="w-4 h-4" />}
                        placeholder="https://www.youtube.com/channel/yourname"
                      />
                    </div>
                  </>
                )}

                {/* Password Tab */}
                {tab === tabs[2] && (
                  <>
                    <div className="space-y-1">
                      <Label htmlFor="oldPassword">Old Password</Label>
                      <Input
                        id="oldPassword"
                        type="password"
                        value={oldPassword}
                        onChange={(event) => setOldPassword(event.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="confirmNewPassword">
                        Confirm New Password
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
                  </>
                )}

                <InputError messages={[error]} className="mt-2" />

                <Button
                  type="button"
                  className="w-full"
                  onClick={handleUpdateProfile}
                >
                  Update
                </Button>
              </form>
            </div>
          </div>
        </div>
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
