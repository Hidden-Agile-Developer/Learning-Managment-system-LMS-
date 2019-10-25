const adminModel=require('../Model/adminModel');
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
   describe('Product Schema test anything', () => {
    // the code below is for insert testing
     it('Add product testing anything', () => {
     const user = {
     'first_name': 'Roshan',
     'last_name': 'Shah',
     'gender': 'Male',
     'user_type': 'admin',
     'email': 'roshanshah@gmail.com',
     'contact': '981709786',
     'password': 'admin'
     
     };
    
     return adminModel.create(user)
     .then((pro_ret) => {
     expect(pro_ret.first_name).toEqual('Roshan');
    expect(pro_ret.last_name).toEqual('Shah');
     expect(pro_ret.gender).toEqual('Male');
     expect(pro_ret.user_type).toEqual('admin');
     expect(pro_ret.email).toEqual('roshanshah@gmail.com');
     expect(pro_ret.contact).toEqual('981709786');
     expect(pro_ret.password).toEqual('admin');
 
     });
     });

     // update the test
    it('to test the update', async () => { 
 
        return adminModel.updateOne({
           _id :Object('5dc8cc9edeac4005bc0aed92'
           )}, 
           {$set : {first_name:'Dragonball'}})     
            .then((pp)=>{         
                expect(pp.ok).toEqual(1)     
          })    
        }) 

     // the code below is for delete testing
    it('to test the delete product is working or not', async () => {
     const status = await adminModel.deleteMany();
    expect(status.ok).toBe(1);
   });
    })