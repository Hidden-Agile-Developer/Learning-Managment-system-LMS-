const sectionModel=require('../Model/sectionModel');
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
            'subject':'Agile',
            'semister':'last',
            'section':'19D'      
        };                  
        return sectionModel.create(user)             
        .then((pro_ret) => {                           
            expect(pro_ret.subject).toEqual('Agile'); 
            expect(pro_ret.semister).toEqual('last');
            expect(pro_ret.section).toEqual('19D'); 
          
           
           }); 
    });

    // update the test
    it('to test the update', async () => { 
 
        return sectionModel.updateOne({
           _id :Object('5dc8cc9edeac4005bc0aed92'
           )}, 
           {$set : {first_name:'Dragonball'}})     
            .then((pp)=>{         
                expect(pp.ok).toEqual(1)     
          })    
        }) 

     
            

          //  delete the test
           it('to test the delete user is working or not', async () => {         
                const status = await sectionModel.deleteMany();         
               expect(status.ok).toBe(1); });  


    })