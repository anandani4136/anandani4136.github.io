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



var userIDNumber = ""                   //Global variable for the current user's ID
var selectedChatRoom = "General"        //Current Chat room variable
var generalChatRoom = "General"         //Common Chat room variable (default case)
var uniqueMessArr = []                  //Array so that duplicate messages are not reprinted
var myMess = false;                     //Boolean to check if the message added is of the user's
var xButton = 0                         
var CR4 = []


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
    if (user) {                                     //Sets/updates all firebase and project variables and makes everything visible if user is signed in
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
      scrollToBottom();
      firebase.database().ref('users/'+userID).on('value',function(snapshot){     
        let root = document.documentElement;
        if(snapshot.val().messageColor!=null)
            root.style.setProperty('--messColor', ""+snapshot.val().messageColor)
        if(snapshot.val().themeColor!=null)    
            root.style.setProperty('--themeColor', ""+snapshot.val().themeColor)
      })
    } else {                            //Blocks all content if user is not signed in
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

function insertMessage(){                               //takes the input field value and time to create a message element in the firebase
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
    firebase.database().ref('chats/'+utcMilllisecondsSinceEpoch).set({                                                                                           //Uses chat ID as a reference to insert data into the Firebase (message, time, and reactions)
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

function changeName(){                                                                          //Updates the user session ID
    firebase.database().ref('users/'+userID).update({                                                                                           
        userName: document.getElementById("userName").value
    })
}

function addMessage(messageV, dateTime, sender, usersName, messageID, reactions){               //Creates HTML element of message
    if(!uniqueMessArr.includes(dateTime+messageID))
    {
        uniqueMessArr.push(dateTime+messageID);
    }
    else
        return;
    
    if (messageV.substring(0,8)=="https://" && (messageV.substring(messageV.length-3)=="jpg")){ //if a jpg image address is goven then it will make an image-based message
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

    } else {                                                    //Standard Text message creation
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
    scrollToBottom()
}

function char_count(str, letter) {                          //https://www.w3resource.com/javascript-exercises/javascript-function-exercise-22.php Counts how many of a specific character are in a string
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

function likeMessage(messIdentifier, buttonID){                             //updates the html with latest value and add an upvote emote
    firebase.database().ref('chats/'+messIdentifier).once('value',function(snapshot){
        firebase.database().ref('chats/'+messIdentifier).update({
            Reactions: snapshot.val().Reactions + "1"
        })
        let x = document.getElementById(buttonID).innerHTML
        document.getElementById(buttonID).innerHTML = x.substring(0,2)+(char_count(snapshot.val().Reactions,"1"));
    })
}
function dislikeMessage(messIdentifier, buttonID){                          //updates the html with latest value and add a downvote emote
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
    firebase.database().ref('users/'+userNumber).on('value',function(snapshot){                                                              //Uses user ID as a reference to pull data from the Firebase into a snapshot, which captures the 
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
    scrollToBottom();
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
        let ref = firebase.database().ref().child("users");                                                                               //sets variable 'ref' as the users table
        ref.once('value', function(snapshot) {                                                                                                //and takes a snapshot of the users table data
            let snap = snapshot.val();                                                                                                      //parses out snapshot values
            for (i in snap){
                //console.log(i)                                                                                                                //iterate through the objects in the snapshot (Goes through each users's data)
                for (n in snap[i]){                                                                                                         //Goes through each object's keys (Each Name, ID, etc.)
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
                            }                                                                                    
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
    var gName = uniqueChars.join(", ")
    makeChatButton(gName, chatroomName)
    document.getElementById("inputFriend").value = ""

}

function makeChatButton(senderName, chatroomName){                      //Makes a new button to access linked chat
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

function loadChats(){                           //Loads all chats the user is linked to
    //console.log(selectedChatRoom)
    let chatARR = []
    let ref = firebase.database().ref().child("chatroom_users");
    ref.once('value', function(snapshot) {
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


function loadMessages(){                                                                            //Loads messages based on chat group, epoch time, and sender
    firebase.database().ref('chatroom_chats/'+selectedChatRoom).on('value',function(snapshot5){
    let ref = firebase.database().ref().child("chats");   
    let yy=0;
    ref.on('value', function(snapshot) {      
        let chatsOrder = []                                                                                    
        let snap = snapshot5.val();                                                                                                   
        for (i in snap){   
            if(chatsOrder.includes(i))
                continue;
            chatsOrder.push(i)
        }
        for(i=0;i<chatsOrder.length;i++){
            let orderMessage = chatsOrder[i]
            firebase.database().ref('chats/'+orderMessage).on('value',function(snapshot1){
                var personID = ""
                let ref = firebase.database().ref().child("chat_user");         
                let userNombre = ""                                                                     
                ref.on('value', function(snapshot2) {                                                                                     
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
                    })
                })
            });
        }
    });
})
}


function signGoogle(){                                      //Uses sign in with Google to get User information and log them into firebase
    var provider = new firebase.auth.GoogleAuthProvider();
    //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().languageCode = 'EN';
    provider.setCustomParameters({
        'login_hint': 'user@example.com'
    });
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

const chatB = document.getElementById("chatBox")
function scrollToBottom() {                     //Scrolls to bottom to see latest messages
    let chatB = document.getElementById("chatBox")
    chatB.scrollTop = chatB.scrollHeight;
    // var div = document.getElementById("chatBox")
    // div.scrollTop(div.prop('scrollHeight'));
}

