import { readAndCompressImage } from 'browser-image-resizer';
import React, { useEffect, useState } from "react";
import { blobUrlToBase64 } from "../utils/Base64ToImageUrl";

const imageConfig = {
    quality: 0.7,
    maxWidth: 800,
    maxHeight: 600,
    autoRotate: true,
    debug: true,
};


function ImageUploader({ onChange, initialImage }) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        async function convertBlobToBase64() {
            if (initialImage) {
                const base64 = await blobUrlToBase64(initialImage);
                onChange(base64);
            }
        }
        setImage(initialImage);
        convertBlobToBase64();
    }, [initialImage]);

    const handleImageChange = async (e) => {
        e.preventDefault();

        const file = e.target.files[0];

        try {
            const resizedImage = await readAndCompressImage(file, imageConfig);
            const reader = new FileReader();

            reader.onloadend = () => {
                setImage(reader.result);
                onChange(reader.result); // Chame a função onChange com o resultado da leitura do arquivo
            };

            reader.readAsDataURL(resizedImage);
        } catch (error) {
            console.error('Error while resizing the image: ', error);
        }
    };


    return (
        <div className="flex flex-col items-center">
            <label htmlFor="image-upload" className="cursor-pointer">
                <div className="w-40 h-40 bg-gray-200 rounded-md flex items-center justify-center">
                    {image ? (
                        <img
                            src={image}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-md"
                        />
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-12 h-12 text-gray-400"
                        >
                            <path d="M21 15a2 2 0 0 1-2 2h-4.586a1 1 0 0 1-.707-.293L9.414 14H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l2 2h5a2 2 0 0 1 2 2v6z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    )}
                </div>
            </label>
            <input
                id="image-upload"
                type="file"
                className="sr-only"
                onChange={handleImageChange}
            />
            <label
                htmlFor="image-upload"
                className="mt-2 text-white bg-primary text-card py-2 px-4 rounded-md cursor-pointer hover:bg-secondary focus:ring-2 focus:ring-primary-500 focus:outline-none"
            >
                Escolha sua imagem
            </label>
        </div>
    );
}

export default ImageUploader;
