(function(root){
  "use strict";

  var reqwest = root.reqwest;

  var contactNameStartsWith = function(contact, query) {
    if (!! contact.displayName) {
      return contact.displayName.toLowerCase().indexOf(query) !== -1;
    } else if (!! contact.name) {
      return contact.name.toLowerCase().indexOf(query) !== -1;
    }
  };

  var phonegapContactsStub = {
    contacts: [],
    addContacts: function(callback) {
      reqwest({
        url: '../vendor/charactersInfo.json?callback=load',
        type: 'jsonp'
      }).then(function(res) {
        phonegapContactsStub.contacts = res;
        if (typeof callback === 'function') {
          callback();
        }
      });
    }
  };

  if ( typeof root.navigator.contacts == 'undefined' ) {
    root.navigator.contacts = {
      find: function(fields, callback, errorCallback, options) {
        var filter = "";
        var filteredContacts = [];

        if (!! options ) {
          filter = options.filter.toLowerCase();
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
