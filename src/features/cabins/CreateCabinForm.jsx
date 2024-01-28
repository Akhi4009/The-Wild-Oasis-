import {useForm} from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

function CreateCabinForm({cabinToEdit = {}, onCloseModal}) {
  
  const {isCreating, createCabin} = useCreateCabin()
  const {isUpdating, updateCabin} = useUpdateCabin();

  const {id:editId,...editValues} = cabinToEdit;
  const isEditSession = Boolean(editId);
  
  const {
    register,handleSubmit,reset,
    getValues,formState:{errors}
    } = useForm({
    defaultValues:isEditSession ? editValues : {},
    });

const isWorking = isCreating || isUpdating;

  function onSubmit(data){
    const image = typeof data.image === 'string' ? data.
    image:data.image[0];

    if(isEditSession) updateCabin(
      {newCabin:{...data, image},id:editId},
      {
        onSuccess:(data)=>{
          reset();
          onCloseModal?.();
        }
      }
      );
  
    else createCabin(
      {...data,image:image},
      {
        onSuccess:(data)=>{
          reset();
          onCloseModal?.();
        }
      }
      );
   }

   return (
     <Form 
     type={onCloseModal? "modal" : "regular"} 
     onSubmit={handleSubmit(onSubmit)}>
      
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
         <Button variation="secondary" type="reset"
          onClick={() => onCloseModal?.()}>
           Cancel
         </Button>
         <Button disabled={isWorking}>{ isEditSession ? "Edit cabin" : "Create new cabin"}</Button>
       </FormRow>
     </Form>
   );
 }

 export default CreateCabinForm;
