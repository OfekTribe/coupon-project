import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class NotificationService{

    public success(msg : string){
        toast.success(msg);
    }

    public error(err : any){
        if(typeof err == "string"){
            toast.error(err);
        } else if (typeof err.response?.data == "string"){
            toast.error(err.response.data);
        } else {
            toast.error(err.msg);
        }
    }


}

const notificationService = new NotificationService;
export default notificationService;