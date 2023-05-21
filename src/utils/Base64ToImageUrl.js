
export function base64ToImageUrl(base64) {
    if (base64) {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/png' });

        const url = URL.createObjectURL(blob);
        return url;
    }

}

export async function blobUrlToBase64(blobUrl) {
    // Fetch the blob from the Blob URL
    const blob = await fetch(blobUrl).then(r => r.blob());

    // Read the blob as a Base64 string
    const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });

    // Return the Base64 string, without the data URL prefix
    return base64.split(',')[1];
}

