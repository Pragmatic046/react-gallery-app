import { useEffect, useState } from "react";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // API key got by registering an app on Unsplash.com website
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    // fulfilling the promise by fetch
    fetch(`https://api.unsplash.com/photos/?client_id=${apiKey}`)
      .then((response) => response.json()) // after promise files should be in the JS Object Notation (json)
      .then((data) => {
        // inserting json data to our required hook or variable
        setImages(data);
        setLoading(false); // if data inserted to our required place loading should be stop.
      })
      .catch((error) => {
        alert("Error occurred: ", error);
        setLoading(false); // if the data can not be redirected the loading should be stop.
      });
  }, []);

  return (
    <>
      <div className="main-container">
        <h1>Gallery Application</h1>
        {loading && ( // if loading is true show the below code
          <>
            {" "}
            <div>
              <h3>Please wait the files are retrieving. . .</h3>
            </div>
          </>
        )}
        <div className="gallery-container">
          {images.map(
            (
              image // mapping images (fetched data) and traversing each item from the data by 'key' attribute using 'image.id' as it's value
            ) => (
              <div key={image.id}>
                <img src={image.urls.small} alt="" />
                <p className="img-info">
                  <span>
                    {image.user.first_name + " " + image.user.last_name}
                  </span>
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default App;
