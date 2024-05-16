export default function createLightboxSources(mainPhotoPath, images) {
  const sources = [];

  if (mainPhotoPath) {
    sources.push(mainPhotoPath);
  }

  if (images && images.length > 0) {
    images.forEach((image) => {
      if (image.url) {
        sources.push(image.url);
      }
    });
  }

  return sources;
}
