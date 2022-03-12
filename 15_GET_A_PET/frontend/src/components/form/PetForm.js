import {useState} from 'react';
import styles from './Form.module.css';
import Input from './Input';
import Select from './Select';


function PetForm({handleSubmit, petData, btnText}){
    const [pet, setPet] = useState(petData || {});
    const [preview, setPreview] = useState([]);
    const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Rajado", "Mesclado"];

    function onFileChange(e){
        setPreview(Array.from(e.target.files))
        setPet({...pet, images: [...e.target.files]});
    }

    function handleOnChange(e){
        setPet({...pet, [e.target.name]: e.target.value});
    }

    function handleColor(e){
        setPet({...pet, color: e.target.options[e.target.selectedIndex].text});
    }

    function submit(e){
        e.preventDefault();
        handleSubmit(pet);
    }
    return (
        <form className={styles.form_container} onSubmit={submit}>
            <div className={styles.preview_pet_images}>
                {preview.length > 0
                    ? preview.map((img, index) => (
                        <img src={URL.createObjectURL(img)} alt={pet.name} key={`${pet.name} + ${index}`}/>
                    )):
                    pet.images && 
                        pet.images.map((img, index) => (
                            <img src={`${process.env.REACT_APP_API}/images/pets/${img}`} alt={pet.name} key={`${pet.name} + ${index}`}/>
                        ))
                }
            </div>
            <Input text="Imagens do PET" type="file" name="images" handleOnChange={onFileChange} multiple={true}/>
            <Input text="Nome do PET" type="text" name="name" handleOnChange={handleOnChange} placeholder="Digite o nome do PET" value={pet.name || ''}/>
            <Input text="Idade do PET" type="number" name="age" handleOnChange={handleOnChange} placeholder="Digite a idade do PET" value={pet.age || ''}/>
            <Input text="Peso do PET" type="number" name="weight" handleOnChange={handleOnChange} placeholder="Digite o peso do PET" value={pet.weight || ''}/>
            <Select name="color" text="Selecione a cor" options={colors} handleOnChange={handleColor} value={pet.color || ''}/>
            <Input type="submit" value={btnText}/>
        </form>
    )
}

export default PetForm