var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        var options      = new ContactFindOptions();
        options.filter   = "";
        options.multiple = true;
        var fields = ["displayName","phoneNumbers"];
        navigator.contacts.find(fields, onSuccessContact, onErrorContact, options);
    },

    onSuccessContact: function(contacts) {
        // for (var i = 0; i < contacts.length; i ++){
        //     var node = document.createElement("LI");                 // Create a <li> node
        //     var textnode = document.createTextNode(contacts[i].displayName + " " + contacts[i].phoneNumber);         // Create a text node
        //     node.appendChild(textnode);                              // Append the text to <li>
        //     document.getElementById("contacts").appendChild(node); 
        // }
        // var node = document.createTextNode(JSON.stringify(contacts));
        // document.getElementById("main").appendChild(node);
        alert('Found ' + contacts.length + ' contacts.');
    },
    onErrorContact: function() {

    },

};

app.initialize();