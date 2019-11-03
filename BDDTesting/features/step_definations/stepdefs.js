const assert = require('assert');
const { Given, When, Then } = require('cucumber');


function isItValidLogin(email,password,user_type) {
    // We'll leave the implementation blank for now
  }
  
  Given('admin navigates to sign in page', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });
  

  When('admin enter valid “abc@gmail.com”', function () {
    // Write code here that turns the phrase above into concrete actions
    this.actualAnswer = isItValidLogin(this.email); 
  });


  Then('user is redirected to Admin dashboard', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  Then('I should be told {string}', function (expectedAnswer) {
    assert.equal(this.actualAnswer, expectedAnswer);
  });
