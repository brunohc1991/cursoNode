const ObjectId = require("mongoose").Types.ObjectId;
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const Pet = require("../models/pet");

module.exports = class PetController{
    static async create(req, res){
        const {name, age, weight, color} = req.body;
        const available = true;

        //upload images
        const images = req.files;
        

        //validation


        if(!name){
            res.status(422).json({message:"O nome do pet é obrigatório!"});
            return;
        }
        if(!age){
            res.status(422).json({message:"A idade do pet é obrigatório!"});
            return;
        }
        if(!weight){
            res.status(422).json({message:"O peso do pet é obrigatório!"});
            return;
        }
        if(!color){
            res.status(422).json({message:"A cor do pet é obrigatório!"});
            return;
        }
        if(!images || images.length === 0){
            res.status(422).json({message:"Ao menos uma imagem do pet é obrigatório!"});
            return;
        }

        //get pet owner
        const token = getToken(req);
        const user = await getUserByToken(token);
        //create a pet
        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user:{
                _id: user._id,
                name: user.name,
                phone: user.phone,
                img: user.img
            }
        });

        images.map((image) => {
            pet.images.push(image.filename)
        })

        try {
            const newPet = await pet.save();
            res.status(201).json({
                message:"Pet cadastrado com sucesso!",
                newPet: newPet
        })
        } catch (error) {
            res.status(500).json({message:error})
        }

    }

    static async getAll(req, res){
        const pets = await Pet.find().sort('-createdAt');

        res.status(200).json({pets: pets});
    }

    static async getAllUserPets(req, res){

        const token = getToken(req);
        const user = await getUserByToken(token);

        const pets = await Pet.find({'user._id':user._id}).sort('-createdAt');

        res.status(200).json({pets: pets});
    }

    static async getAllMyAdoptions(req, res){

        const token = getToken(req);
        const user = await getUserByToken(token);

        const pets = await Pet.find({'adopter._id':user._id}).sort('-createdAt');

        res.status(200).json({pets: pets});
    }
    
    static async getByID(req, res){

        const id = req.params.id;

        if(!ObjectId.isValid(id)){
            res.status(422).json({message:"Pet não encontrado!"});
            return;
        }
        
        
        const pet = await Pet.findById(id);
        
        if(!pet){
            res.status(422).json({message:"Pet não encontrado!"});
            return;
        }

        res.status(200).json({pet: pet});
    }

    static async deleteByID(req, res){
        const id = req.params.id;

        if(!ObjectId.isValid(id)){
            res.status(422).json({message:"Pet não encontrado!"});
            return;
        }

        const pet = await Pet.findById(id);
        
        if(!pet){
            res.status(422).json({message:"Pet não encontrado!"});
            return;
        }

        //valida se o usuario logado é o dono do pet
        const token = await getToken(req);
        const user = await getUserByToken(token);

        if(user._id.toString() !== pet.user._id.toString()){
            res.status(422).json({message:"Houve um problema ao realizar a sua solicitação!"});
            return;
        }

        await Pet.findByIdAndRemove(id);
        res.status(200).json({message:"Pet removido com sucesso!"});

    }

    static async updatePet(req, res){
        const id = req.params.id;
        const {name, age, weight, color, available} = req.body;
        
        //upload images
        const images = req.files;

        const updatedData = {};

        const pet = await Pet.findById(id);
        
        if(!pet){
            res.status(422).json({message:"Pet não encontrado!"});
            return;
        }

        //valida se o usuario logado é o dono do pet
        const token = await getToken(req);
        const user = await getUserByToken(token);

        if(user._id.toString() !== pet.user._id.toString()){
            res.status(422).json({message:"Houve um problema ao realizar a sua solicitação!"});
            return;
        }

        if(!name){
            res.status(422).json({message:"O nome do pet é obrigatório!"});
            return;
        } else {
            updatedData.name = name;
        }

        if(!age){
            res.status(422).json({message:"A idade do pet é obrigatório!"});
            return;
        } else {
            updatedData.age = age;
        }

        if(!weight){
            res.status(422).json({message:"O peso do pet é obrigatório!"});
            return;
        } else {
            updatedData.weight = weight;
        }
        
        if(!color){
            res.status(422).json({message:"A cor do pet é obrigatório!"});
            return;
        } else {
            updatedData.color = color;
        }

        if(images.length > 0) {
            updatedData.images = [];
            images.map((image) =>{
                updatedData.images.push(image.filename);
            })
        }

        await Pet.findByIdAndUpdate(id, updatedData);

        res.status(200).json({"message":"Pet atualizado com sucesso"})
    }

    static async schedule(req, res){
        const id = req.params.id;

        const pet = await Pet.findById(id);
        
        if(!pet){
            res.status(422).json({message:"Pet não encontrado!"});
            return;
        }

         //valida se o usuario logado é o dono do pet
         const token = await getToken(req);
         const user = await getUserByToken(token);
 
         if(pet.user._id.equals(user._id)){
             res.status(422).json({message:"Você não pode agendar uma visita para o seu proprio PET!"});
             return;
         }

         //check se o usuario ja agendou uma visita
         if(pet.adopter && pet.adopter._id.equals(user._id)){
            res.status(422).json({message:"Você ja agendou uma visita para este PET!"});
            return;
         }

         // add user to pet
         pet.adopter = {
             _id: user._id,
             name: user.name,
             image: user.image
         }

         await Pet.findByIdAndUpdate(id, pet);

         res.status(200).json({"message":`A visita foi agendada com sucesso. Entra em contato com: ${pet.user.name} pelo telefone: ${pet.user.phone}`})
    }

    static async concludeAdoption(req, res){
        const id = req.params.id;

        const pet = await Pet.findById(id);
        
        if(!pet){
            res.status(422).json({message:"Pet não encontrado!"});
            return;
        }

         //valida se o usuario logado é o dono do pet
         const token = await getToken(req);
         const user = await getUserByToken(token);
 
         if(user._id.toString() !== pet.user._id.toString()){
             res.status(422).json({message:"Você não pode concluir uma adoção para um PET que não é seu!"});
             return;
         }

         if(!pet.adopter){
            res.status(422).json({message:"Você não pode concluir uma adoção para um PET sem candidato!"});
            return;
         }

         pet.available = false;

         await Pet.findByIdAndUpdate(id, pet);
         res.status(200).json({"message":`Processo de adoção concluido com sucesso!`})
    }
}