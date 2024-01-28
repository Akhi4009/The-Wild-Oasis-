import styled from "styled-components";
import { HiPencil, HiTrash } from "react-icons/hi";
import { BsCopy } from "react-icons/bs";
import {formatCurrency} from "../../utils/helpers"

import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

function CabinRow({cabin}) {
  const {isDeleting, deleteCabin} = useDeleteCabin()
  const {createCabin} = useCreateCabin();

  const {
    id, maxCapacity, regularPrice,
    discount, image, name, description,
  } = cabin;


  function handleDuplicate(){
    createCabin({
      name:`Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description
    })

  }
  return (
    <Table.Row>
    <Img src={image} alt={name}/>
    <Cabin>{name}</Cabin>
    <div>Fits up to {maxCapacity}</div>
    <Price>{formatCurrency(regularPrice)}</Price>
    {
      discount ? 
      <Discount>{formatCurrency(discount)}</Discount>
      : <span>&mdash;</span>
    }
    <div>
    <Modal>
    <Menus.Menu>
    <Menus.Toggle id={id}/>

    <Menus.List id={id}>
    <Menus.Button 
      icon={<BsCopy/>}
      onClick={handleDuplicate}
    >
      Duplicate
    </Menus.Button>
    <Modal.Open opens="edit">
    <Menus.Button 
    icon={<HiPencil/>}>
    Edit
    </Menus.Button>
    </Modal.Open>
    <Modal.Open opens="delete">
    <Menus.Button
       icon={<HiTrash/>}>
       Delete
    </Menus.Button>
    </Modal.Open>
    </Menus.List>
    </Menus.Menu>

    <Modal.Window name="edit">
    <CreateCabinForm cabinToEdit={cabin} />
    </Modal.Window>

    <Modal.Window name="delete">
    <ConfirmDelete 
    disabled={isDeleting}
    onConfirm={()=>deleteCabin(id)}
    resourceName="cabin"
    />
    </Modal.Window>
    </Modal>
    </div>
    </Table.Row>
    )
  }
  

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default CabinRow
    
    