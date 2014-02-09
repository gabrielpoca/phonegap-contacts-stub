test("the base function exists", function() {
  ok(phonegapContactsStub);
});

asyncTest("returns empty contacts list", function() {
  QUnit.reset(); 
  window.navigator.contacts.find(undefined, function(contacts) {
    equal(0, contacts.length);
    start();
  });
});

test("the contacts list has one contact", function() {
  phonegapContactsStub.addContacts(1);
  equal(1, phonegapContactsStub.contacts.length);
});

test("the contacts list is empty", function() {
  equal(0, phonegapContactsStub.contacts.length);
});
