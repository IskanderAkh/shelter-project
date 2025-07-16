import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Cookies from "js-cookie"; // Import the js-cookie library

const useLogout = () => {
    const queryClient = useQueryClient();
    const { mutate: logout } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch("/api/auth/logout", {
                    method: "POST",
                });
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            Cookies.remove('cart'); // Remove the cart cookie
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            window.location.reload()
            toast.success("Logout successful");
        },
        onError: (error) => {
            console.log(error);
            toast.error("Logout failed");
        },
    });
    return { logout };
};

export default useLogout;