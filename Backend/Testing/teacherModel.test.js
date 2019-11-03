const userModel=require('../Model/teacherModel');
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
    'first_name': 'Amar',
    'last_name': 'Shrestha',
    'gender': 'Male',
    'user_type': 'admin',
    'email': 'mahato@amar',
    'contact': '981709786',
    'password': 'admin'
    
    };
   
    return userModel.create(user)
    .then((pro_ret) => {
    expect(pro_ret.first_name).toEqual('Amar');
    expect(pro_ret.last_name).toEqual('Mahato');
    expect(pro_ret.gender).toEqual('Male');
    expect(pro_ret.user_type).toEqual('admin');
    expect(pro_ret.email).toEqual('mahato@amar');
    expect(pro_ret.contact).toEqual('981709786');
    expect(pro_ret.password).toEqual('admin');

    });
    });
   // the code below is for delete testing
    it('to test the delete product is working or not', async () => {
     const status = await userModel.deleteMany();
    expect(status.ok).toBe(1);
   });
})
