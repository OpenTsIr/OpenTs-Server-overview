const assert = require('assert');
const { When, Then } = require('@cucumber/cucumber');
const { Greeter } = require('src');

When('the user inters bahman as { username } and { password } as password', function ()
{
  this.whatIHeard = new Greeter().sayHello();
});

Then('the user will be successfully logged in', function (expectedResponse)
{
  assert.equal(this.whatIHeard, expectedResponse);
});
