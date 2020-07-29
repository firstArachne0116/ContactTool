/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var allContacts = [];

document.getElementById('searchButton').addEventListener('click', onSearch);
document.getElementById('markButton').addEventListener('click', onMark);

function onSearch() {
    const filter = document.getElementById('filter').value;
    for (let i = 0; i < allContacts.length; i ++) {
        for (let j = 0; j < allContacts[i].phoneNumbers.length; j++) {
            var contact = document.getElementById("tr" + allContacts[i].phoneNumbers[j].id);
            if (allContacts[i].displayName.includes(filter) || allContacts[i].phoneNumbers[j].value.includes(filter)) {
                contact.style.display = 'table-row';
            } else {
                contact.style.display = 'none';
            }
        }
    }
}

function getOptions() { 
    var ele = document.getElementsByName('options'); 
      
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) {
            return ele[i].value;
        }
    }
} 

function onMark() {
    const option = getOptions();
    for (let i = 0; i < allContacts.length; i ++) {
        let bUpdate = false;
        for (let j = 0; j < allContacts[i].phoneNumbers.length; j++) {
            var contact = document.getElementById("tr" + allContacts[i].phoneNumbers[j].id);
            if (contact.style.display !== 'none') {
                var num = document.getElementById("num" + allContacts[i].phoneNumbers[j].id);
                bUpdate = true;
                if (parseInt(option)) {
                    allContacts[i].phoneNumbers[j].value = allContacts[i].phoneNumbers[j].value + '*';
                }
                else {
                    allContacts[i].phoneNumbers[j].value = '*' + allContacts[i].phoneNumbers[j].value;
                }
                num.innerHTML = allContacts[i].phoneNumbers[j].value;
            }
        }
        if (bUpdate) {
            allContacts[i].save(function(saveSuccess) {
                // alert("Contact successful update");
            }, function(saveError){
                // alert("Error when updating");
            });
        }
    }
}

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener("deviceready", this.onDeviceReady.bind(this), false);
    },


    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // "pause", "resume", etc.
    onDeviceReady: function() {
        alert('ready');
        var options      = new ContactFindOptions();
        options.filter   = "";
        options.multiple = true;
        var fields = ["displayName","phoneNumbers"];
        navigator.contacts.find(fields, this.onSuccessContact, this.onErrorContact, options);
    },

    onSuccessContact: function(contacts) {
        alert(JSON.stringify(contacts));
        contacts.sort(function(a, b) {
            if (a.displayName === b.displayName) return 0;
            if (a.displayName > b.displayName) return 1;
            return -1;
        })
        allContacts = contacts;
        var contactsNode = document.getElementById("contacts");
        for (let i = 0; i < contacts.length; i ++) {
            for (let j = 0; j < contacts[i].phoneNumbers.length; j++) {
                var contact = document.createElement("tr");
                contact.setAttribute('id', 'tr'+contacts[i].phoneNumbers[j].id);

                // var ID = document.createElement("td");
                // ID.appendChild(document.createTextNode(contacts[i].phoneNumbers[j].id));

                var name = document.createElement("td");
                name.appendChild(document.createTextNode(contacts[i].displayName));

                var phoneNumber = document.createElement("td");
                phoneNumber.setAttribute('id', 'num'+contacts[i].phoneNumbers[j].id);
                phoneNumber.appendChild(document.createTextNode(contacts[i].phoneNumbers[j].value));

                var phoneType = document.createElement("td");
                phoneType.appendChild(document.createTextNode(contacts[i].phoneNumbers[j].type));

                // contact.appendChild(ID);
                contact.appendChild(name);
                contact.appendChild(phoneNumber);
                contact.appendChild(phoneType);

                contactsNode.appendChild(contact);
            }
        }
    },

    onErrorContact: function(err) {
        alert("error occured while contacts receiving");
    },

};

app.initialize();