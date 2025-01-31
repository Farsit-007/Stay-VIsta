import { useState } from "react";
import AddRoomForm from "../../Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../API/Utils";
import { useMutation } from '@tanstack/react-query'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const AddRoom = () => {
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const[loading,setLoading] = useState(false)
    const [imagePreview, setImagePreview] = useState();
    const [imageText, setImageText] = useState('Upload Image')
    const { user } = useAuth()
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const { mutateAsync } = useMutation({
        mutationFn: async roomData => {
            const { data } = await axiosSecure.post(`/room`, roomData)
            return data
        },
        onSuccess: () => {
            toast.success('Data Uploaded Successfully');
            navigate('/dashboard/my-listings')
            setLoading(false)
        }
    })

    const handleDates = (item) => {
        console.log(item);
        setDates(item.selection);
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const form = e.target;
        const location = form.location.value;
        const category = form.category.value;
        const title = form.title.value;
        const to = dates.endDate;
        const from = dates.startDate;
        const price = form.price.value;
        const guest = form.total_guest.value;
        const bathrooms = form.bathrooms.value;
        const description = form.description.value;
        const bedrooms = form.bedrooms.value;
        const image = form.image.files[0]
        const host = {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email
        }
        try {
            const image_URL = await imageUpload(image)
            const roomData = {
                location,
                category,
                title,
                to,
                from,
                price,
                guest,
                bathrooms,
                description,
                bedrooms,
                host,
                image: image_URL
            }
            console.table(roomData);
            await mutateAsync(roomData)
        } catch (err) {
            toast.error(err.message);
            setLoading(false)
        }
    }
    const handleImage = image => {
        setImagePreview(URL.createObjectURL(image))
        setImageText(image.name)
    }

    return (
        <>
            <AddRoomForm dates={dates} handleDates={handleDates} handleSubmit={handleSubmit}
                setImagePreview={setImagePreview} imagePreview={imagePreview} handleImage={handleImage}
                imageText={imageText} loading={loading}></AddRoomForm>
        </>
    );
};

export default AddRoom;