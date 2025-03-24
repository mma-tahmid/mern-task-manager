import Swal from "sweetalert2";
import { UpdateStatusApiRequest } from "../ApiRequest/TaskApiRequest";


export const updateStatusToDo = async (id, statuss) => {
    try {
        const { value: newStatus } = await Swal.fire({
            title: 'Change Status',
            input: 'select',
            showCancelButton: true,
            inputOptions: {
                new: 'New',
                completed: 'Completed',
                progress: 'Progress',
                canceled: 'Canceled'
            },
            inputValue: statuss, // selected status (Previous Status)
        });

        if (newStatus) {
            const response = await UpdateStatusApiRequest(id, newStatus);
            return response;
        } else {
            //throw new Error('No status selected');
            console.log("No status selected")
        }
    } catch (error) {
        console.error("Error updating status:", error);
        return { success: false, message: error.message };
    }
};
