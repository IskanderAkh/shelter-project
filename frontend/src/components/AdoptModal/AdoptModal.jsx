import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const AdoptModal = ({ animalId, onClose }) => {
    const mutation = useMutation({
        mutationFn: async ({ description }) => {
            const res = await axios.post(`/api/animal/adopt/${animalId}`, {
                description,
            });
            return res.data;
        },
        onSuccess: () => {
            toast.success("Adoption request sent! Shelter staff will contact you shortly.");
            onClose();
        },
        onError: (error) => {
            const message =
                error?.response?.data?.error || error?.message || "Something went wrong.";
            toast.error(message);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const description = e.target.description.value.trim();
        mutation.mutate({ description });
    };

    return (
        <dialog open className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Adopt This Animal</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <textarea
                        name="description"
                        className="textarea textarea-bordered w-full"
                        placeholder="Why do you want to adopt?"
                        rows={4}
                        required
                    ></textarea>

                    <div className="modal-action">
                        <button type="submit" className="btn btn-neutral">
                            {mutation.isPending ? "Sending..." : "Confirm Adoption"}
                        </button>
                        <button type="button" className="btn" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default AdoptModal;
