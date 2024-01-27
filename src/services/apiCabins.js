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

export async function createEditCabin(newCabin,id){
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    
    // create cabin 
const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/","");

const imagePath = hasImagePath ?
newCabin.image
:`${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

let query = supabase.from('cabins');

// Create
if(!id)
   query = query.insert([{...newCabin,image:imagePath}])


// Edit 
if(id)
    query = query.update({...newCabin,image:imagePath}).eq("id",id);
    const { data, error } = await query.select().single();
    
    if(error){
        console.log(error);
        throw new Error("Cabin could not be created");
    }
if(hasImagePath) return data;

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