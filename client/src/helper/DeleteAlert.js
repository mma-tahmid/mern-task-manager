import Swal from "sweetalert2";
import { DeleteTaskApiRequest } from "../ApiRequest/TaskApiRequest";


const DeleteToDO = async (taskid) => {
    try {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            const deleteResult = await DeleteTaskApiRequest(taskid)
            return deleteResult;

        }
    } catch (error) {
        console.error('Error deleting ToDo:', error);
        throw new Error('Failed to delete ToDo');
    }
};

export default DeleteToDO;