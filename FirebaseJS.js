// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
apiKey: "AIzaSyCuUGTeyRVqWle6vkxEP7yvEFeteAvIb5I",
authDomain: "fir-javascript1.firebaseapp.com",
projectId: "fir-javascript1",
storageBucket: "fir-javascript1.appspot.com",
messagingSenderId: "611851654892",
appId: "1:611851654892:web:21abd1d985fd064c9177c9",
measurementId: "G-RKT1YL6PE1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let root = document.documentElement;
root.style.setProperty('--messColor', ""+document.getElementById("messColor").value)
root.style.setProperty('--themeColor', ""+document.getElementById("backColor").value)
selectedParent = "";                                                                                                                        //Global Variable that keeps track of the parent that we are keeping track of, helps when iterating through its children

var textEnter = document.getElementById("inputMessage");
textEnter.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        insertMessage();
    }
});

var inputEmoji = document.getElementById('inputMessage')
var getEmoji = document.getElementById('emojiButton')
var picker = new EmojiButton({
    position: 'right-end'
})
picker.on('emoji',function(emoji){
    inputEmoji.value +=emoji;
})
getEmoji.addEventListener('click', function(){
    picker.pickerVisible ? picker.hidePicker() : picker.showPicker(getEmoji);
})



var userIDNumber = ""
var selectedChatRoom = "General"
var generalChatRoom = "General"
var uniqueMessArr = []
var myMess = false;
var xButton = 0
var CR4 = []
// const buttonEmoji = document.getElementById("emojiButton")
// const tooltipEmoji = document.querySelector('.tooltipEmoji')
// Popper.createPopper(buttonEmoji, tooltipEmoji)
// function toggle() {
//     tooltipEmoji.classList.toggle('shown')
// }   

// function emojiChamp(){
//     //console.log("dab")
//     var x = document.getElementById("emojiPick").outerHTML
//     //console.log(x.match(/\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff]/g))  ;
//     //console.log(x)
// }


var modal = document.getElementById("myModal");
var btn = document.getElementById("settings");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


function settingsPage(){
    //console.log("SET ME UP")
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      sessionName = "nameV#"+Math.random()+"";
      document.getElementById("clear1").style.visibility = "hidden";
      document.getElementById("chatBox").style.visibility = "visible";
      document.getElementById("controlDiv").style.visibility = "visible";
      document.getElementById("clear2").style.visibility = "visible";
      document.getElementById("usrNote").innerHTML = "Signed in as "+firebase.auth().currentUser.displayName
      document.getElementById("usrNote2").innerHTML = "Welcome "+firebase.auth().currentUser.displayName+", what would you like to do today?"
      document.getElementById("userName").value = sessionName
      //console.log("Signed IN")
      //console.log(firebase.auth().currentUser.uid)
      userIDNumber = firebase.auth().currentUser.uid
      userID = firebase.auth().currentUser.uid
      firebase.database().ref('users/'+userID).update({                                                                                           
        userName: sessionName,
        name: firebase.auth().currentUser.displayName,
        email: firebase.auth().currentUser.email
        // messageColor: document.getElementById("messColor").value,
        // themeColor: document.getElementById("themeColor").value
      })
      let updates = {
        [`user_chatroom/${userIDNumber}/${selectedChatRoom}`]: true,
        [`chatroom_users/${selectedChatRoom}/${userIDNumber}`]: true
      }
      firebase.database().ref().update(updates)
      var element = document.getElementById("chatBox");
      element.innerHTML = '';
      var element2 = document.getElementById("chatButtons");
      element2.innerHTML = '';
      loadMessages()
      loadChats()
      firebase.database().ref('users/'+userID).on('value',function(snapshot){     
        let root = document.documentElement;
        if(snapshot.val().messageColor!=null)
            root.style.setProperty('--messColor', ""+snapshot.val().messageColor)
        if(snapshot.val().themeColor!=null)    
            root.style.setProperty('--themeColor', ""+snapshot.val().themeColor)
      })
    } else {
      // No user is signed in.
      //console.log("Signed Out")
      document.getElementById("usrNote").innerHTML = "Sign in to access ARCHAT"
      document.getElementById("usrNote2").innerHTML = "Sign In to View Settings"
      document.getElementById("clear1").style.visibility = "visible"
      document.getElementById("chatBox").style.visibility = "hidden";
      document.getElementById("controlDiv").style.visibility = "hidden";
      document.getElementById("clear2").style.visibility = "hidden";
    }
});

function insertMessage(){
    messageV = document.getElementById('inputMessage').value;  
    if (messageV === "") {
        return
    }
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    if (today.getHours()>12){
        time = (today.getHours()-12) + ":" + today.getMinutes() + ":" + today.getSeconds()+"PM  :\n";
    } else {
        time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()+"AM  : \n";
    }
    var dateTime = date+' '+time+'  '+"\n";
    document.getElementById('inputMessage').value = ""

    
    //addMessage(messageV, dateTime, userIDNumber)
    ////console.log(new Date().toLocaleTimeString()); // 11:18:48 AM
    const now = new Date()  
    const utcMilllisecondsSinceEpoch = now.getTime() + (now.getTimezoneOffset() * 60 * 1000) 
    //console.log(utcMilllisecondsSinceEpoch)
    myMess = true;
    firebase.database().ref('chats/'+utcMilllisecondsSinceEpoch).set({                                                                                           //Uses student ID as a reference to insert data into the Firebase (name, id, grade, and gender)
        Message: messageV,
        Time: dateTime,
        Reactions: ""
    })
    let updates = {
        [`user_chats/${userIDNumber}/${utcMilllisecondsSinceEpoch}`]: true,
        [`chat_user/${utcMilllisecondsSinceEpoch}/${userIDNumber}`]: true,
        [`chatroom_chats/${selectedChatRoom}/${utcMilllisecondsSinceEpoch}`]: true,
        [`chat_chatroom/${utcMilllisecondsSinceEpoch}/${selectedChatRoom}`]: true
    }
    firebase.database().ref().update(updates)

    var element = document.getElementById("chatBox");
    element.innerHTML = '';
    uniqueMessArr = []
    var element2 = document.getElementById("chatButtons");
    element2.innerHTML = '';
    
    loadMessages()
    loadChats()
    
}

function changeName(){
    //console.log("ok")
    firebase.database().ref('users/'+userID).update({                                                                                           
        userName: document.getElementById("userName").value
    })
}

function addMessage(messageV, dateTime, sender, usersName, messageID, reactions){
    if(!uniqueMessArr.includes(dateTime+messageID))
    {
        uniqueMessArr.push(dateTime+messageID);
    }
    else
        return;
    
    if (messageV.substring(0,8)=="https://" && (messageV.substring(messageV.length-3)=="jpg")){
        var image = document.createElement("img")
        var spana = document.createElement("span")
        var nod3 = document.createTextNode(dateTime+" \n")
        var likeButton = document.createElement("button")
        likeButton.innerText = "👍";
        likeButton.onclick = function(){
            likeMessage(messageID);
        };
        var dislikeButton = document.createElement("button")
        dislikeButton.innerText = "👎";
        dislikeButton.onclick = function(){
            dislikeMessage(messageID);
        };
        spana.appendChild(nod3)
        spana.appendChild(likeButton)
        spana.appendChild(dislikeButton)
        spana.className += "tooltiptext";
        image.src = messageV
        image.appendChild(spana)
        image.className += "message last";
        image.style.width = 200
        var bigDiv = document.createElement("div");
        if(sender == userIDNumber || myMess){
            bigDiv.className ="mine messages"
        }else{
            bigDiv.className ="yours messages"
        }
        bigDiv.appendChild(image)
        var element = document.getElementById("chatBox");
        element.appendChild(bigDiv);

    } else {
        var para = document.createElement("div");
        var spana = document.createElement("span")
        var nod3 = document.createTextNode(dateTime+" \n")
        var likeButton = document.createElement("button")
        likeButton.innerText = "👍"+char_count(reactions,"1");
        likeButton.id = Math.random()
        likeButton.onclick = function(){
            likeMessage(messageID, likeButton.id);
        };
        var dislikeButton = document.createElement("button")
        dislikeButton.innerText = "👎"+char_count(reactions,"2");
        dislikeButton.id = Math.random()
        dislikeButton.onclick = function(){
            dislikeMessage(messageID, dislikeButton.id);
        };
        spana.appendChild(nod3)
        spana.appendChild(likeButton)
        spana.appendChild(dislikeButton)
        spana.className += "tooltiptext";
        var node = document.createTextNode(messageV);
        para.appendChild(node);
        para.appendChild(spana)
        para.className += "message last";
        var bigDiv = document.createElement("div");
        //console.log("myMess=",myMess)
        if(sender == userIDNumber || myMess){
            bigDiv.className ="mine messages"
        }else{
            bigDiv.className ="yours messages"
        }
        bigDiv.appendChild(para)
        var element = document.getElementById("chatBox");
        element.appendChild(bigDiv);
    }
    if(sender != userIDNumber){
        var nameTag = document.createElement("div")
        var nameNode = document.createTextNode(usersName);
        nameTag.appendChild(nameNode)
        nameTag.className ="nameShow"
        var element = document.getElementById("chatBox");
        element.appendChild(nameTag);
    }
    myMess=false;
}

function char_count(str, letter) {                          //https://www.w3resource.com/javascript-exercises/javascript-function-exercise-22.php
 var letter_Count = 0;
 for (var position = 0; position < str.length; position++) 
 {
    if (str.charAt(position) == letter) 
      {
      letter_Count += 1;
      }
  }
  return letter_Count;
}

function likeMessage(messIdentifier, buttonID){
    firebase.database().ref('chats/'+messIdentifier).once('value',function(snapshot){
        firebase.database().ref('chats/'+messIdentifier).update({
            Reactions: snapshot.val().Reactions + "1"
        })
        let x = document.getElementById(buttonID).innerHTML
        document.getElementById(buttonID).innerHTML = x.substring(0,2)+(char_count(snapshot.val().Reactions,"1"));
    })
}
function dislikeMessage(messIdentifier, buttonID){
    firebase.database().ref('chats/'+messIdentifier).once('value',function(snapshot){
        firebase.database().ref('chats/'+messIdentifier).update({
            Reactions: snapshot.val().Reactions + "2"
        })
        let x = document.getElementById(buttonID).innerHTML
        document.getElementById(buttonID).innerHTML = x.substring(0,2)+(char_count(snapshot.val().Reactions,"2"));
    })
}

function getUserName(userNumber){
    //console.log(userNumber)
    var foundUserName = ""
    //console.log(foundUserName)
    firebase.database().ref('users/'+userNumber).on('value',function(snapshot){                                                              //Uses student ID as a reference to pull data from the Firebase into a snapshot, which captures the 
        foundUserName = snapshot.val().name;
        //console.log(foundUserName)
        return foundUserName;
    })
    //return foundUserName;
}

function chatView(userID){
    //console.log("NEW")
    //console.log(userID)
    selectedChatRoom = userID
    var element = document.getElementById("chatBox");
    element.innerHTML = '';
    var element2 = document.getElementById("chatButtons");
    element2.innerHTML = '';
    uniqueMessArr = []
    loadMessages()
    loadChats()
}

function addContactPage(){
    //console.log("YES")
    let personArr = []
    let namesArr = []
    let nameV = document.getElementById("inputFriend").value
    personArr = nameV.split(/[.\-_]/)
    //console.log(personArr)
    let chatroomName = userIDNumber+";"+nameV.substring(0,nameV.indexOf("."))
    personArr.forEach(element => {
        let ref = firebase.database().ref().child("users");                                                                               //sets variable 'ref' as the student table
        ref.once('value', function(snapshot) {                                                                                                //and takes a snapshot of the student table data
            let snap = snapshot.val();                                                                                                      //parses out snapshot values
            for (i in snap){
                //console.log(i)                                                                                                                //iterate through the objects in the snapshot (Goes through each student's data)
                for (n in snap[i]){                                                                                                         //Goes through each object's keys (Eash Student's ID, Name, etc.)
                    if (((snap[i][n]) == element && n=="name") || ((snap[i][n]) == element && n=="userName")){        
                        firebase.database().ref('users/'+i).once('value',function(snapshot){   
                            //console.log(snapshot.val().name) 
                            //console.log(snapshot.val().userName)
                            //console.log(snapshot.val().email)
                            if(i!=userIDNumber){
                                namesArr.push(snapshot.val().name)
                                let updates = {
                                    [`user_chatroom/${userIDNumber}/${chatroomName}`]: true,
                                    [`chatroom_users/${chatroomName}/${userIDNumber}`]: true,
                                    [`user_chatroom/${i}/${chatroomName}`]: true,
                                    [`chatroom_users/${chatroomName}/${i}`]: true
                                }
                                firebase.database().ref().update(updates)
                            }                                                                                    //Uses student name to find student ID as a reference to pull data from the Firebase into another  
                        });
                    }
                }
            }
        });
    });
    console.log(namesArr)
    let uniqueChars = namesArr.filter((c, index) => {
        return namesArr.indexOf(c) === index;
    });
    console.log(uniqueChars)
    var gName = namesArr.join(", ")
    makeChatButton(gName, chatroomName)
    document.getElementById("inputFriend").value = ""

}

function makeChatButton(senderName, chatroomName){
    let contactButton = document.createElement("button")
    contactButton.innerText = senderName;
    contactButton.type = "Group"
    contactButton.onclick = function(){
        chatView(chatroomName);
    };
    var element = document.getElementById("chatButtons");
    element.appendChild(contactButton);
}

function changeMessageColor(){
    let root = document.documentElement;
    root.style.setProperty('--messColor', ""+document.getElementById("messColor").value)
    firebase.database().ref('users/'+userIDNumber).update({
        messageColor: document.getElementById("messColor").value
    })
}

function changeThemeColor(){
    let root = document.documentElement;
    root.style.setProperty('--themeColor', ""+document.getElementById("backColor").value)
    firebase.database().ref('users/'+userIDNumber).update({
        themeColor: document.getElementById("backColor").value
    })
}

function loadChats(){
    //console.log(selectedChatRoom)
    let chatARR = []
    let ref = firebase.database().ref().child("chatroom_users");
    ref.on('value', function(snapshot) {
        let snap = snapshot.val();                                                                                                   
        for (i in snap){
            if(i!="General"){
                //console.log("CHATS")
                //console.log(i)
                for (j in snap[i]){
                    //console.log(j)
                    chatARR.push(j)
                }
                if(chatARR.includes(userIDNumber)){
                    let chatName = ""
                    let pplArr = []
                    chatARR.forEach(element => {
                        if(element!=userIDNumber){
                            //console.log(element)
                            firebase.database().ref('users/'+element).on('value',function(snapshot2){  
                                pplArr.push(snapshot2.val().name)
                                //console.log(snapshot2.val().name)
                            })
                        }
                    });
                    chatName = pplArr.join(", ")
                    // chatName.substring(0,chatName.length-1)
                    //console.log(chatName)
                    if(chatName==""){
                        chatName="Click to load Chat"
                    }
                    makeChatButton(chatName, i)
                }
            }
            else{
                makeChatButton(i, i)
            }
        }
    })
}


function loadMessages(){
    
    ////////////////////////////////////////////////////////////////////////////////////////////VERIFY CHAT ROOM MESSAGES HERE
    firebase.database().ref('chatroom_chats/'+selectedChatRoom).on('value',function(snapshot5){
    let ref = firebase.database().ref().child("chats");   
    //console.log("RONIT ANANDANI-------\n\n");
    let yy=0;
    ref.on('value', function(snapshot) {   
        // var element = document.getElementById("chatBox");
        // element.innerHTML = '';        
        let chatsOrder = []                                                                                    
        let snap = snapshot5.val();                                                                                                   
        for (i in snap){   
            if(chatsOrder.includes(i))
                continue;
            chatsOrder.push(i)
            //console.log(yy++," loadMessages(): i in snap="+i)
        }
        // let uniqueChats = chatsOrder.filter((c, index) => {
        //     return chatsOrder.indexOf(c) === index;
        // });
        for(i=0;i<chatsOrder.length;i++){
            // if (i==0){
            //     //console.log("CLEAR")
            //     var element = document.getElementById("chatBox");
            //     element.innerHTML = '';
            //     //chatsOrder = []
            //     clearFields()
            //     clearFields()
            // }
            //console.log(i+" loadMessage chatsOrder[i] loop="+chatsOrder[i])
            // //console.log(chatsOrder)
            // if(chatsOrder.includes(i)){
            //     chatsOrder.remove(i)
            // }
            
            let orderMessage = chatsOrder[i]
            
            // var element = document.getElementById("chatBox");
            // element.innerHTML = '';  
            firebase.database().ref('chats/'+orderMessage).on('value',function(snapshot1){
                   
                var personID = ""
                let ref = firebase.database().ref().child("chat_user");         
                let userNombre = ""                                                                     
                ref.on('value', function(snapshot2) {       
                       //////////////////////////////////////////////////                                                                                     
                    let snap2 = snapshot2.val();                                                                                                   
                    for (j in snap2){
                        for (m in snap2[j]){
                            if(j==orderMessage){
                                personID=m//+"2"
                                firebase.database().ref('users/'+personID).on('value',function(snapshot3){  
                                    userNombre = snapshot3.val().name
                                })
                            }
                        }
                    }
                    let ref = firebase.database().ref().child("chat_chatroom");
                    ref.on('value', function(snapshot7) {
                        let snapC = snapshot7.val();                                                                                                   
                        for (f in snapC){
                            for(k in snapC[f]){
                                if(f==orderMessage && k==selectedChatRoom){
                                    addMessage(snapshot1.val().Message, snapshot1.val().Time, personID, userNombre, orderMessage, snapshot1.val().Reactions)
                                }
                            }
                        }
                    //console.log("%-1")
                    //if(checkRepeat(snapshot1.val().Message, snapshot1.val().Time, personID, userNombre))
                    //console.log("RAAAHHUUUULLLLL--->"+personID,"---",userNombre,"---",orderMessage);
                    
                    })
                })
            });
        }
    });
})
}

// function checkRepeat(messageV, dateTime, sender, usersName){
//     if(CR1.includes(messageV)){
//         if (hasDuplicates(CR1)) {
//             //console.log("Duplicate elements found.");
//             return false
//         }
//         else {
//             ////console.log("No Duplicates found.");
//             return true
//         }
//         // var x = CR1.lastIndexOf(messageV)
//         // //console.log(x)
//         // if(CR2[x]==dateTime && CR3[x]==sender && CR4[x]==usersName){
//         //     //console.log("UH OH STINKY")
//         //     return false
//         // }
//     } else {
//         CR1.push(messageV)
//         CR2.push(dateTime)
//         CR3.push(sender)
//         CR4.push(usersName)
//         return true
//     }
// }

// function hasDuplicates(arr)
// {
//     return new Set(arr).size !== arr.length; 
// }
 
// var arr = [ 2, 4, 6, 5, 4 ];
 


//For relational DB, this will help:
//https://medium.com/@alfianlosari/firebase-realtime-database-many-to-many-relationship-schema-4155d9647f0f

//For understanding how relational DB's can work with foreign keys
//https://cloud.google.com/spanner/docs/foreign-keys/how-to

//Understanding how FireBase Queries are set up
//https://www.tutorialspoint.com/firebase/firebase_queries.htm

//Video for setting up Insertion, ID based Selection, Updating, and Deleting Data from FireBase
//https://www.youtube.com/watch?v=oxqVnWPg0So


// READY DATA
var nameV, idV, gradeV, genV;
function ready(){                                                                                                                           //Initializes and declares the variables as the value of our HTML elements
    nameV = document.getElementById('namebox').value;                                                                                       //Makes it easy to reference HTML data when the user requests anything
    idV = document.getElementById('idbox').value;
    gradeV = document.getElementById('gradebox').value;
    genV = document.getElementById('genderbox').value;
}


//INSERTION PROCESS
document.getElementById('insert').onclick = function(){                                                                                     //Upon the activation of the insert button
    ready();                                                                                                                                //The function calls the ready() function which updates the global variables to the latest inputted data
    alert(nameV+" has been inserted into the Firebase")                                                                                     //Alerts the user of their action being done
    firebase.database().ref('student/'+idV).set({                                                                                           //Uses student ID as a reference to insert data into the Firebase (name, id, grade, and gender)
        NameOfStudent: nameV,
        StudentID: idV,
        Grade: gradeV,
        Gender: genV
    })
}


//SELECTION PROCESS
document.getElementById("select").onclick = function(){                                                                                     //Upon the activation of the select button
    ready();                                                                                                                                //The function calls the ready() function which updates the global variables to the latest inputted data
    studenID = "404"                                                                                                                        //A default id is set to avoid sending null if the inputted data is invalid
    if(document.getElementById("selectionsID").options[document.getElementById("selectionsID").selectedIndex].value=="selectSID"){          //Using a conditional to check if the ID based selection is selected by the user
        alert("Searching for Student ID #"+idV)                                                                                             //Alerts the user of their action being done                               
        firebase.database().ref('student/'+idV).on('value',function(snapshot){                                                              //Uses student ID as a reference to pull data from the Firebase into a snapshot, which captures the 
            document.getElementById('namebox').value = snapshot.val().NameOfStudent;                                                        //  attributes of the student object that matches with the ID (Name, Grade, and Gender)
            document.getElementById('gradebox').value = snapshot.val().Grade;
            document.getElementById('genderbox').value = snapshot.val().Gender;
            studenID = idV                                                                                                                  //updates local variable studenID with the selected ID
            getParentData(studenID)                                                                                                         //Calls getParentData() and passed ID as a parameter to get the student's parent data
        });
    }
    if(document.getElementById("selectionsID").options[document.getElementById("selectionsID").selectedIndex].value=="selectSName"){        //Using a conditional to check if the Name based selection is selected by the user
        alert("Searching for Student Name "+nameV)                                                                                          //Alerts the user of their action being done
        let ref = firebase.database().ref().child("student");                                                                               //sets variable 'ref' as the student table
        ref.on('value', function(snapshot) {                                                                                                //and takes a snapshot of the student table data
            let snap = snapshot.val();                                                                                                      //parses out snapshot values
            for (i in snap){                                                                                                                //iterate through the objects in the snapshot (Goes through each student's data)
                for (n in snap[i]){                                                                                                         //Goes through each object's keys (Eash Student's ID, Name, etc.)
                    if ((snap[i][n]) == nameV && n=="NameOfStudent"){                                                                       //Conditional for if the object key matches the Student Name Attribute
                        firebase.database().ref('student/'+i).on('value',function(snapshot){                                                //Uses student name to find student ID as a reference to pull data from the Firebase into another  
                            document.getElementById('idbox').value = snapshot.val().StudentID;                                              //  snapshot, which captures the attributes of the student object that matches with the ID (ID, Grade, and Gender) 
                            document.getElementById('gradebox').value = snapshot.val().Grade;
                            document.getElementById('genderbox').value = snapshot.val().Gender;
                            studenID = snapshot.val().StudentID;                                                                            //updates local variable studenID by pulling out the ID from the snapshot data
                            getParentData(studenID)                                                                                         //Calls getParentData() and passed ID as a parameter to get the student's parent data
                        });
                    }
                }
            }
        });
    }
    if(document.getElementById("selectionsID").options[document.getElementById("selectionsID").selectedIndex].value=="selectSGrade"){       //Using a conditional to check if the grade based selection is selected by the user
        alert("Searching for Student Grade "+gradeV)                                                                                        //Alerts the user of their action being done
        let ref = firebase.database().ref().child("student");                                                                               //sets variable 'ref' as the student table
        ref.on('value', function(snapshot) {                                                                                                //and takes a snapshot of the student table data
            let snap = snapshot.val();                                                                                                      //parses out snapshot values
            for (i in snap){                                                                                                                //iterate through the objects in the snapshot (Goes through each student's data)
                for (n in snap[i]){                                                                                                         //Goes through each object's keys (Eash Student's ID, Name, etc.)
                    if ((snap[i][n]) == gradeV && n=="Grade"){                                                                              //Conditional for if the object key matches the Student Grade Attribute
                        firebase.database().ref('student/'+i).on('value',function(snapshot){                                                //Uses student grade to find student ID as a reference to pull data from the Firebase into another 
                            document.getElementById('namebox').value = snapshot.val().NameOfStudent;                                        //  snapshot, which captures the attributes of the student object that matches with the ID (Name, ID, and Gender)
                            document.getElementById('idbox').value = snapshot.val().StudentID;                                              
                            document.getElementById('genderbox').value = snapshot.val().Gender;                                 
                            studenID = snapshot.val().StudentID;                                                                            //updates local variable studenID by pulling out the ID from the snapshot data
                            getParentData(studenID)                                                                                         //Calls getParentData() and passed ID as a parameter to get the student's parent data
                        });
                    }
                }
            }
        });
    }
    if(document.getElementById("selectionsID").options[document.getElementById("selectionsID").selectedIndex].value=="selectSGender"){      //Using a conditional to check if the gender based selection is selected by the user
        alert("Searching for Student Gender "+genV)                                                                                         //Alerts the user of their action being done
        let ref = firebase.database().ref().child("student");                                                                               //sets variable 'ref' as the student table
        ref.on('value', function(snapshot) {                                                                                                //and takes a snapshot of the student table data
            let snap = snapshot.val();                                                                                                      //parses out snapshot values
            for (i in snap){                                                                                                                //iterate through the objects in the snapshot (Goes through each student's data)
                for (n in snap[i]){                                                                                                         //Goes through each object's keys (Eash Student's ID, Name, etc.)
                    if ((snap[i][n]) == genV && n=="Gender"){                                                                               //Conditional for if the object key matches the Student Gender Attribute
                        firebase.database().ref('student/'+i).on('value',function(snapshot){                                                //Uses student gender to find student ID as a reference to pull data from the Firebase into another 
                            document.getElementById('namebox').value = snapshot.val().NameOfStudent;                                        //  snapshot, which captures the attributes of the student object that matches with the ID (Name, ID, and Grade)
                            document.getElementById('idbox').value = snapshot.val().StudentID;
                            document.getElementById('gradebox').value = snapshot.val().Grade;
                            studenID = snapshot.val().StudentID;                                                                            //updates local variable studenID by pulling out the ID from the snapshot data
                            getParentData(studenID)                                                                                         //Calls getParentData() and passed ID as a parameter to get the student's parent data
                        });
                    }   
                }
            }
        });
    }
    if(studenID!="404"){                                                                                                                    //Conditional to make sure that getParentData is not called without proper data by making sure it is not the default value
        getParentData(studenID)
    } else {
        //console.log("Student Not Found")
    }
}


//UPDATE PROCESS
document.getElementById("update").onclick = function(){                                                                                     //Upon the activation of the update button
    ready();                                                                                                                                //The function calls the ready() function which updates the global variables to the latest inputted data
    alert("Student ID #"+idV+"'s information has been updated in the Firebase")                                                             //Alerts the user of their action being done
    firebase.database().ref('student/'+idV).update({                                                                                        //Uses student ID as a reference to update data of the Firebase by tagging Name, Grade, and Gender
        NameOfStudent: nameV,
        Grade: gradeV,
        Gender: genV
    })
}


//DELETION PROCESS
document.getElementById("delete").onclick = function(){                                                                                     //Upon the activation of the delete button
    ready();                                                                                                                                //The function calls the ready() function which updates the global variables to the latest inputted data
    alert("Student ID #"+idV+"'s information has been deleted from the Firebase")                                                           //Alerts the user of their action being done
    firebase.database().ref('student/'+idV).remove();                                                                                       //Uses student ID as a reference to delete all data relating to the student
    clearFields()                                                                                                                           //Calls the clearFields function to clear all HTML input and output values
}


//CLEAR INPUT FIELDS
document.getElementById("cleare").onclick = function(){clearFields()}                                                                       //Upon the activation of the clear button, the clearFields function is called

function clearFields(){
    var element = document.getElementById("chatBox");
    element.innerHTML = '';
}


//GET PARENT DATA
function getParentData(studentsID){                                                                                                         //The getParentData function takes in the selected student ID as a parameter
    let database = firebase.database()                                                                                                      //sets Firebase Database call as a variable to make it easier to reference
    let ref = firebase.database().ref().child("student_parents");                                                                           //sets the student_parents list as a variable to make it easier to reference
    sIndex = parseInt(studentsID)                                                                                                           //parses out the integer from the student ID parameter string to use it as an index
    ref.on('value', function(snapshot) {                                                                                                    //Uses student ID to pull out the object corresponding to the student in a snapshot
        let snap = snapshot.val();                                                                                                          //parses out snapshot values
        for (n in snap[sIndex]){                                                                                                            //iterates through each attribute of the student object (Goes through all the student's parents)
            selectedParent = n                                                                                                              //Updates the global variable as the the parent object to update the selected parent
            database.ref(`parents/${n}`).once('value')                                                                                      //Uses the parent object as a reference to go through the parents list and find the corresponding parent object 
            .then((snapshot2) => {                                                                                                          //  (and makes a snapshot of the corresponding parent object to get Name, ID, and Contact)
                document.getElementById('pnamebox').value = snapshot2.val().ParentName;
                document.getElementById('pidbox').value = snapshot2.val().ParentID;
                document.getElementById('pcontactbox').value = snapshot2.val().ParentContact;
            })
        }
    })
}


//ITERATE THROUGH PARENT KIDS
document.getElementById('lastKid').onclick = function(){                                                                                    //The left arrow button means that we are going through the parent's kids by going backwards in indexes
    let ref = firebase.database().ref().child("parents_students");                                                                          //sets the parents_students list as a variable to make it easier to reference
    let selectedStuArr = [];                                                                                                                //local array to keep all the parent students in one list that is easy to access
    ref.on('value', function(snapshot) {                                                                                                    //Uses global variable of selected parent to pull out the object corresponding to the parent in a snapshot
        let snap = snapshot.val();                                                                                                          //parses out snapshot values
        for (n in snap[selectedParent]){                                                                                                    //iterates through the object keys (parent's children)
            selectedStuArr.push(n)                                                                                                          //adds keys (each parent child) to the local array
        }
        let maxVal =  Math.max.apply(Math, selectedStuArr)                                                                                  //Finds highest ID value of all children and stores it in an array
        let minVal =  Math.min.apply(Math, selectedStuArr)                                                                                  //Finds lowest ID value of all children and stores it in an array
        if(parseInt(document.getElementById('idbox').value) == parseInt(minVal)){                                                           //Conditional checking if the current student displayed has a value that is the minimum value of the array
            firebase.database().ref('student/'+""+maxVal).on('value',function(snapshot){                                                    //resets student ID to maximum to iterate through the array again and pulls out all information of the new
                document.getElementById('namebox').value = snapshot.val().NameOfStudent;                                                    //  student object in a snapshot, from which name, grade, and gender are set
                document.getElementById('gradebox').value = snapshot.val().Grade;
                document.getElementById('genderbox').value = snapshot.val().Gender;
                document.getElementById('idbox').value = maxVal                                                                             //student ID is reset to max in order to continue the revolution of students displayed
            });
        } else {                                                                                                                            //Result of the conditional not being the minimum value of the array
            for (s in selectedStuArr){                                                                                                      //Iterates through all students
                if(parseInt(selectedStuArr[s]) < parseInt(document.getElementById('idbox').value)){                                         //conditional checking if a student from has a smaller ID value then the existing displayed student
                    firebase.database().ref('student/'+selectedStuArr[s]).on('value',function(snapshot){                                    //Student ID is set to the lower student ID and all information of the new student object is pulled into a snapshot, 
                        document.getElementById('namebox').value = snapshot.val().NameOfStudent;                                            //  from which name, grade, and gender are set
                        document.getElementById('gradebox').value = snapshot.val().Grade;
                        document.getElementById('genderbox').value = snapshot.val().Gender;
                        document.getElementById('idbox').value = selectedStuArr[s]                                                          //student ID is set to the lower value to display the new student
                    });
                }
            }
        }
    })
}


document.getElementById('nextKid').onclick = function(){                                                                                    //The right arrow button means that we are going through the parent's kids by going forwards in indexes
    let ref = firebase.database().ref().child("parents_students");                                                                          //sets the parents_students list as a variable to make it easier to reference
    let selectedStuArr = [];                                                                                                                //local array to keep all the parent students in one list that is easy to access
    ref.on('value', function(snapshot) {                                                                                                    //Uses global variable of selected parent to pull out the object corresponding to the parent in a snapshot
        let snap = snapshot.val();                                                                                                          //parses out snapshot values
        for (n in snap[selectedParent]){                                                                                                    //iterates through the object keys (parent's children)
            selectedStuArr.push(n)                                                                                                          //adds keys (each parent child) to the local array
        }
        let maxVal =  Math.max.apply(Math, selectedStuArr)                                                                                  //Finds highest ID value of all children and stores it in an array
        let minVal =  Math.min.apply(Math, selectedStuArr)                                                                                  //Finds lowest ID value of all children and stores it in an array
        if(parseInt(document.getElementById('idbox').value) == parseInt(maxVal)){                                                           //Conditional checking if the current student displayed has a value that is the maximum value of the array
            firebase.database().ref('student/'+""+minVal).on('value',function(snapshot){                                                    //resets student ID to minimum to iterate through the array again and pulls out all information of the new
                document.getElementById('namebox').value = snapshot.val().NameOfStudent;                                                    //  student object in a snapshot, from which name, grade, and gender are set
                document.getElementById('gradebox').value = snapshot.val().Grade;                                                           
                document.getElementById('genderbox').value = snapshot.val().Gender;                                                         
                document.getElementById('idbox').value = minVal                                                                             //student ID is reset to min in order to continue the revolution of students displayed
            });
        } else {                                                                                                                            //Result of the conditional not being the maximum value of the array
            for (s in selectedStuArr){                                                                                                      //Iterates through all students
                if((parseInt(selectedStuArr[s]) > parseInt(document.getElementById('idbox').value))){                                       //conditional checking if a student from has a larger ID value then the existing displayed student
                    firebase.database().ref('student/'+selectedStuArr[s]).on('value',function(snapshot){                                    //Student ID is set to the higher student ID and all information of the new student object is pulled into a snapshot, 
                        document.getElementById('namebox').value = snapshot.val().NameOfStudent;                                            //  from which name, grade, and gender are set
                        document.getElementById('gradebox').value = snapshot.val().Grade;
                        document.getElementById('genderbox').value = snapshot.val().Gender;
                        document.getElementById('idbox').value = selectedStuArr[s]                                                          //student ID is set to the higher value to display the new student
                    });
                }
            }
        }
    })
}



/////////////////////////////////
function signGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().languageCode = 'EN';
    provider.setCustomParameters({
        'login_hint': 'user@example.com'
    });
    // firebase.auth()
    // .signInWithPopup(provider)
    // .then((result) => {
    // /** @type {firebase.auth.OAuthCredential} */
    // var credential = result.credential;

    // // This gives you a Google Access Token. You can use it to access the Google API.
    // var token = credential.accessToken;
    // // The signed-in user info.
    // var user = result.user;
    // // ...
    // }).catch((error) => {
    // // Handle Errors here.
    // var errorCode = error.code;
    // var errorMessage = error.message;
    // // The email of the user's account used.
    // var email = error.email;
    // // The firebase.auth.AuthCredential type that was used.
    // var credential = error.credential;
    // // ...
    // });
    firebase.auth().signInWithRedirect(provider);
    firebase.auth()
    .getRedirectResult()
    .then((result) => {
        if (result.credential) {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // ...
        }
        // The signed-in user info.
        var user = result.user;
    }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        var id_token = googleUser.getAuthResponse().id_token
        // Build Firebase credential with the Google ID token.
        // var credential = firebase.auth.GoogleAuthProvider.credential(id_token);

        // // Sign in with credential from the Google user.
        // firebase.auth().signInWithCredential(credential).catch(function(error) {
        // // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // // The email of the user's account used.
        // var email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // // ...
        // });
    });
}

function signGoogOut(){
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        alert("Successfully Signed Out")
      }).catch((error) => {
        // An error happened.
      });
}

document.getElementById('inputMessage')
  .addEventListener('keyup', function(event) {
    if (event.code === 'Enter') {
      event.preventDefault();
      //console.log("YAY")
      document.querySelector('form').submit();
    }
  });