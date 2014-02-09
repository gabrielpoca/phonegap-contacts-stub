(function(root){
  "use strict";

  var Faker = root.Faker;

  var generateContact = function() {
    var name = Faker.Name.findName();
    return {
      displayName: name,
      name: { formatted: name },
      emails: [{ value: Faker.Internet.email() }]
    };
  };

  var phonegapContactsStub = {
    contacts: [],
    addContacts: function(number) {
      for ( var i = 0; i < number; i++) {
        phonegapContactsStub.contacts.push(generateContact());
      }
    }
  };

  if ( typeof root.navigator.contacts == 'undefined' ) {
    root.navigator.contacts = {
      find: function(fields, callback) {
        callback(phonegapContactsStub.contacts);
      }
    };
  }

  root.phonegapContactsStub = phonegapContactsStub;
})(this);
