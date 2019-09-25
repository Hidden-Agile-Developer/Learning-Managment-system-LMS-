const AssignmentTechModel=require('../Model/AssignmentTechModel');
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
            'email':'a@gmail.com',
            'assignment_code':'#122',
            'assignment_date':'12/12',
            'comment': 'no',
            'assignment':'Agile',
            'faculty':'computer',
            'semister':'last'
        };                  
        return AssignmentTechModel.create(user)             
        .then((pro_ret) => {                           
            expect(pro_ret.email).toEqual('a@gmail.com'); 
            expect(pro_ret.assignment_code).toEqual('#122');
            expect(pro_ret.assignment_date).toEqual('12/12'); 
            expect(pro_ret.comment).toEqual('no');
            expect(pro_ret.assignment).toEqual('Agile');
            expect(pro_ret.faculty).toEqual('computer');
            expect(pro_ret.assignment_date).toEqual('last');
           
        });
    
    }); 

    // update the test
    it('to test the update', async () => { 
 
        return AssignmentTechModel.updateOne({
           _id :Object('5dc8cc9edeac4005bc0aed92'
           )}, 
           {$set : {first_name:'Dragonball'}})     
            .then((pp)=>{         
                expect(pp.ok).toEqual(1)     
          })    
        }) 

     
            

            //delete the test
           it('to test the delete user is working or not', async () => {         
                const status = await AssignmentTechModel.deleteMany();         
               expect(status.ok).toBe(1); });  


    })