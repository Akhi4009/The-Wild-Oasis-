import supabase, {supabaseUrl} from "./supabase"
export async function getCabins(){
    
const { data, error } = await supabase
.from('cabins')
.select('*');

if(error){
    console.log(error);
    throw new Error("Cabins could not find")
}

return data;
}

export async function deleteCabin(id){

    const { error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id);

    if(error){
        console.log(error);
        throw new Error("Cabin could not be deleted");
    }
  
}

export async function createCabin(newCabin){
    // create cabin 
const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/","");

const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

const { data, error } = await supabase
.from('cabins')
.insert([{...newCabin,image:imagePath}])

if(error){
    console.log(error);
    throw new Error("Cabin could not be created");
}

const { error:storageError } = await supabase.storage
.from('cabins-images').upload(imageName, newCabin.image);

if (storageError) {
    const { error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', data.id);
    throw new Error("Cabin image could not uploaded and the cabin was not created");
}

return data;
}