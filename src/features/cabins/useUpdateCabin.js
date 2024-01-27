import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";


export function useUpdateCabin(){
    const queryClient = useQueryClient();

    const {mutate:updateCabin, isLoading:isUpdating} = useMutation({
    mutationFn:({newCabin, id})=>
    createEditCabin(newCabin, id),
    onSuccess:()=>{
        toast.success("Cabin successfully updated");
        queryClient.invalidateQueries({
        queryKey:['cabins']
        });
    },
    onError: (err) => toast.error(err.message),
    })

    return {isUpdating, updateCabin};
}