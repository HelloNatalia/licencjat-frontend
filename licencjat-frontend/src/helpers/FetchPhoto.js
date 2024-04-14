export const fetchPhoto = async (name, setPhotoUrl) => {
  try {
    const response = await fetch(`http://localhost:4000/file/${name}`);
    if (!response.ok) {
      setPhotoUrl("announcement-img/default.png");
    }
    const data = await response.json();
    setPhotoUrl(data.url);
  } catch (error) {
    setPhotoUrl("announcement-img/default.png");
  }
};

export const fetchPhotos = async (names, setPhotosUrl, photosUrl) => {
  //   names.map(async (name) => {
  //     try {
  //       const response = await fetch(`http://localhost:4000/file/${name}`);
  //       const data = await response.json();
  //       setPhotosUrl(...photosUrl, data.url);
  //     } catch (error) {
  //       setPhotosUrl(...photosUrl, "announcement-img/default.png");
  //     }
  //   });

  const urls = await Promise.all(
    names.map(async (name) => {
      try {
        const response = await fetch(`http://localhost:4000/file/${name}`);
        const data = await response.json();
        return data.url;
      } catch (error) {
        console.error("Error fetching photo:", error);
        return "announcement-img/default.png";
      }
    })
  );
  setPhotosUrl(urls);
};
