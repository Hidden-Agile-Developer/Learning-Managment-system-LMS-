const studyMaterialModel=require('../Model/studyMaterialModel');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/lmstesting';
beforeAll(async () => {
    await mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true
    });
   });
   afterAll(async () => {
    await mongoose.connection.close();
   });

   describe('User  Schema test', () => {     
    it('Add User testing', () => {         
        const user = {             
            'email':'shresthau96@gmail.com',
            'assignment':'wallah',
            'faculty': 'computer',
            'semister': 'last'       
        };                  
        return studyMaterialModel.create(user)             
        .then((pro_ret) => {                           
            expect(pro_ret.email).toEqual('shresthau96@gmail.com'); 
            expect(pro_ret.assignment).toEqual('wallah'); 
            expect(pro_ret.faculty).toEqual('computer'); 
            expect(pro_ret.semister).toEqual('last');

        
           
        });  
       });   

       // update the test
    it('to test the update', async () => { 
 
        return studyMaterialModel.updateOne({
           _id :Object('5dc8cc9edeac4005bc0aed92'
           )}, 
           {$set : {first_name:'Dragonball'}})     
            .then((pp)=>{         
                expect(pp.ok).toEqual(1)     
          })    
        }) 

            //delete the test
           it('to test the delete user is working or not', async () => {         
                const status = await studyMaterialModel.deleteMany();         
               expect(status.ok).toBe(1); });  


    })
