var globalTeardown = function() {
  phonegapContactsStub.contacts = [];
};

test("the base function exists", function() {
  ok(phonegapContactsStub);
});

module('Contact list', {
  teardown: function() {
    globalTeardown();
  }
});

test("the contacts list has two contact", function() {
  phonegapContactsStub.addContacts(2);
  equal(phonegapContactsStub.contacts.length, 2);
});

test("the contacts list is empty", function() {
  equal(phonegapContactsStub.contacts.length, 0);
});

module('Contacts API', {
  teardown: function() {
    globalTeardown();
  }
});

asyncTest("returns empty contacts list", function() {
  window.navigator.contacts.find(undefined, function(contacts) {
    equal(contacts.length, 0);
    start();
  });
});

asyncTest("returns all contacts", function() {
  var numberContacts = 8;
  phonegapContactsStub.addContacts( numberContacts );

  window.navigator.contacts.find(undefined, function(contacts) {
    equal(contacts.length, numberContacts);
    start();
  });
});

//test("returns all the matching contacts", function() {
//});

//test("returns an empty array when there is no match", function() {
//});
