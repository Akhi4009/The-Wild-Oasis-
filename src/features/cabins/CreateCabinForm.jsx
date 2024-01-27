import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";


import { createEditCabin } from "../../services/apiCabins";

function CreateCabinForm({cabinToEdit = {}}) {

const {id:editId,...editValues} = cabinToEdit;

const isEditSession = Boolean(editId);

  const {
    register,handleSubmit,reset,
     getValues,formState
     } = useForm({
       defaultValues:isEditSession ? editValues : {},
     });
  
  const {errors} = formState;
 
  const queryClient = useQueryClient();

  const {mutate:createCabin, isLoading:isCreating} = useMutation({
    mutationFn:createEditCabin,
    onSuccess:()=>{
      toast.success("New Cabin successfully created");
      queryClient.invalidateQueries({
        queryKey:['cabins']
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  })

  const {mutate:updateCabin, isLoading:isUpdating} = useMutation({
    mutationFn:({newCabin, id})=>
    createEditCabin(newCabin, id),
    onSuccess:()=>{
      toast.success("Cabin successfully updated");
      queryClient.invalidateQueries({
        queryKey:['cabins']
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  })

  const isWorking = isCreating || isUpdating;

  function onSubmit(data){
    const image = typeof data.image === 'string' ? data.
    image:data.image[0];
    if(isEditSession) updateCabin({newCabin:{...data, image},
    id:editId});
    else createCabin({...data,image:image});
   }

   return (
     <Form onSubmit={handleSubmit(onSubmit)}>
      
       <FormRow label="Cabin name" error={errors?.name?.message}>
       <Input type="text" id="name" disabled={isWorking}
       {...register('name',{required:"This field is required"})}
       />
       </FormRow>
 
       <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
       <Input type="number" id="maxCapacity" disabled={isWorking}
       {
         ...register('maxCapacity',
       {
         required:"This field is required",
         min:{
           value:1,
           message:'Capcity should be at least 1'
         }
       },)
     } />
       </FormRow>
 
       <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" disabled={isWorking}
         {
           ...register('regularPrice',
           {
             required:"This field is required",
             min:{
               value:1,
               message:'Price should be at least 1'
             }
           })} />
       </FormRow>
 
       <FormRow label="Discount" error={errors?.discount?.message} >
         <Input type="number" id="discount" defaultValue={0} disabled={isWorking}
         {
           ...register('discount',
           {
             required:"This field is required",
             validate:(value)=> (+value) <= (+getValues().regularPrice) || "Discount should be less then regular price"
           })} />
       </FormRow>
 
       <FormRow label="Description for website" error ={errors?.description?.message}>
         <Textarea type="number" id="description" defaultValue="" disabled={isWorking}
         {...register('description',{required:"This field is required"})} />
       </FormRow>
 
       <FormRow label="Cabin photo">
         <FileInput id="image" accept="image/*" 
         {...register('image',{required: isEditSession ? false : "This field is required"})}
         />
       </FormRow>
 
       <FormRow>
         {/* type is an HTML attribute! */}
         <Button variation="secondary" type="reset">
           Cancel
         </Button>
         <Button disabled={isWorking}>{ isEditSession ? "Edit cabin" : "Create new cabin"}</Button>
       </FormRow>
     </Form>
   );
 }

 export default CreateCabinForm;
