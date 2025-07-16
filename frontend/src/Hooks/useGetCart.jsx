export const getCart = async () => {
    try {
        const res = await fetch('/api/user/getCart');
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('Error in getCart: ', error);
        throw error;
    }
};

export default getCart;
