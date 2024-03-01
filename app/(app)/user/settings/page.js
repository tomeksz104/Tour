import Settings from "@/components/User/Sections/Settings/Settings";

import { db } from "@/lib/db";

const UserSettings = async () => {
  const socialMediaPlatforms = await db.SocialMediaPlatform.findMany();

  return <Settings socialMediaPlatforms={socialMediaPlatforms} />;
};

export default UserSettings;
