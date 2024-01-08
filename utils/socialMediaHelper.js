// export const updateSocialMediaLinks = (socialMedia, socialMediaLinks) => {
//   return socialMedia.map((media) => {
//     const updatedLink = socialMediaLinks[media.platformId];

//     return {
//       ...media,
//       link: updatedLink || media.link,
//     };
//   });
// };

// export const updateSocialMediaLinks = (socialMedia, socialMediaLinks) => {
//   // Jeśli socialMedia jest dostępne, aktualizuj istniejące linki
//   if (socialMedia && socialMedia.length > 0) {
//     return socialMedia.map((media) => {
//       const updatedLink = socialMediaLinks[media.platformId];
//       return {
//         ...media,
//         link: updatedLink || media.link,
//       };
//     });
//   } else {
//     // Jeśli socialMedia nie jest dostępne, utwórz nowe linki na podstawie socialMediaLinks
//     return Object.entries(socialMediaLinks).map(([platformId, link]) => ({
//       platformId: parseInt(platformId),
//       link,
//     }));
//   }
// };

export const updateSocialMediaLinks = (socialMedia, socialMediaLinks) => {
  // Mapuj istniejące socialMedia do ich zaktualizowanych linków
  const updatedMedia = socialMedia.map((media) => {
    const updatedLink = socialMediaLinks[media.platformId];
    return {
      ...media,
      link: updatedLink,
    };
  });

  // Znajdź platformy, które nie mają jeszcze linków w socialMedia
  const newMediaPlatforms = Object.keys(socialMediaLinks).filter(
    (platformId) =>
      !socialMedia.some((media) => media.platformId.toString() === platformId)
  );

  // Dodaj nowe linki dla tych platform
  const newMedia = newMediaPlatforms.map((platformId) => ({
    platformId: parseInt(platformId),
    link: socialMediaLinks[platformId],
  }));

  // Połącz zaktualizowane i nowe linki
  return [...updatedMedia, ...newMedia];
};
