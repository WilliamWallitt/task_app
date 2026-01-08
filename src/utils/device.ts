export const getDeviceInfo = (): string => {
    const userAgent = navigator.userAgent;

    if (/windows/i.test(userAgent)) return "Windows PC";
    if (/macintosh|mac os x/i.test(userAgent)) return "Mac";
    if (/android/i.test(userAgent)) return "Android Device";
    if (/iphone|ipad/i.test(userAgent)) return "iOS Device";

    return "Unknown Device";
};

export const getUserLocation = async () => {
    try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        return `${data.city}, ${data.country_name}`;
    } catch (error) {
        console.error("Error getting location:", error);
        return "Unknown Location";
    }
};
