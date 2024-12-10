import axios from 'axios';

const API_KEY = '43784096-87519b5a7d318238fedcc7f7a';

export const fetchImage = async (search) => {
    try {
        const randomNumber = Math.round(Math.random() * 10);

        const url = `https://pixabay.com/api/?q=${search}&key=${API_KEY}&image_type=photo&orientation=horizontal`;

        const response = await axios.get(url);

        // Ensure there are hits in the response before accessing an image
        if (response.data.hits.length > 0) {
            const imageUrl = response.data.hits[randomNumber].webformatURL;
            document.querySelector("body").style.background = `url(${imageUrl}) no-repeat center fixed`;
            document.querySelector("body").style.backgroundSize = "cover"; // Ensure the background is properly scaled
        } else {
            throw new Error("No images found for the given search term.");
        }
    } catch (error) {
        console.error("Error fetching the image:", error.message);

        // // Handle the error by displaying a default image or a fallback behavior
        // const fallbackImageUrl = 'https://example.com/default-image.jpg'; // Replace with a valid fallback image URL
        // document.querySelector("body").style.background = `url(${fallbackImageUrl}) no-repeat center fixed`;
        // document.querySelector("body").style.backgroundSize = "cover";
    }
};
