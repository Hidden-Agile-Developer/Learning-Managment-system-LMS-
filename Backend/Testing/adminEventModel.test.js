const adminEventModel=require('../Model/adminEventModel');
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
     'eventName': 'Agile',
     'happeningDate': '2017/1/1',
     'uploadedDate': '2017/1/1',
     
     
     };
    
     return adminEventModel.create(user)
     .then((pro_ret) => {
     expect(pro_ret.eventName).toEqual('Agile');
    expect(pro_ret.happeningDate).toEqual('2017/1/1');
     expect(pro_ret.uploadedDate).toEqual('2017/1/1');
     
 
     });
     });

     // update the test
    it('to test the update', async () => { 
 
        return adminEventModel.updateOne({
           _id :Object('5dc8cc9edeac4005bc0aed92'
           )}, 
           {$set : {eventName:'Dragonball'}})     
            .then((pp)=>{         
                expect(pp.ok).toEqual(1)     
          })    
        }) 

     // the code below is for delete testing
    it('to test the delete product is working or not', async () => {
     const status = await adminEventModel.deleteMany();
    expect(status.ok).toBe(1);
   });
    })