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

  var contactNameStartsWith = function(contact, query) {
    if (!! contact.displayName) {
      return contact.displayName.indexOf(query) === 0;
    } else if (!! contact.name) {
      return contact.name.indexOf(query) === 0;
    }
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
      find: function(fields, callback, errorCallback, options) {
        var filter = "";
        var filteredContacts = [];

        if (!! options ) {
          filter = options.filter;
        }

        for( var i = 0; i < phonegapContactsStub.contacts.length; i++) {
          var contact = phonegapContactsStub.contacts[i];
          if ( filter === "" || contactNameStartsWith(contact, filter) ) {
            filteredContacts.push(contact);
          }
        }

        if (typeof callback == 'function') {
          callback(filteredContacts);
        }
      }
    };
  }

  root.phonegapContactsStub = phonegapContactsStub;
})(this);
