var projectDict = { 
    "key1" : ["value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678value123456789345678","link","Amogus","https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(73).jpg"] , 
    "key2" : ["value2","link","caption here","https://mdbootstrap.com/img/Photos/Vertical/mountain1.jpg"] , 
    "{data.name}": ["This website","is","Sus","https://media0.giphy.com/media/ysiCYZUJkW3XRb7k9K/giphy.gif"] ,
    "Rube Goldberg Machine": ["Utilizing the Matter.js physics engine, this project simulates a Rube Goldberg Machine using various physics based elements.","Rube Goldberg Machine","November - December 2020","media/videos/rubeGoldbergShort.gif", "https://timothy-gonzalez.com/rube-goldberg-machine"],
    "Multilingual Object Detection": ["An object detection model is used to identify prominent objects using the webcam and the name of the object is spoken out based on the chosen language, either repeating a direct translation or utilizing an accent. Uses Coco SSD, TensorFlow, and Text-to-Speech.","Multilingual Object Detection","May 2021","media/images/tensorFlow.jpg", "https://anandani4136.github.io/Multilingual-Object-Detection/"],
    "This Website": ["Drawing elements from various animation and CSS scripts, this website was made from scratch using JavaScript, HTML, and CSS. Unlike many other sites of its kind, this site does not use a custom template but instead was designed entirely by me. The code is available to view below.","Code on GitHub","2021","media/images/tensorFlow.png", "https://github.com/anandani4136/anandani4136.github.io"],
    "First slide label": ["This website","is","Sus","https://mdbootstrap.com/img/Photos/Vertical/mountain1.jpg"],
    "CompSci Kids Parent Portal": ["This is a website that allows parents to register kids for after-school CS tutoring sessions. It replaced an online form that parents had to fill out numerous times. Not only does this website save parents a lot of time, but it lays the groundwork for other future CompSci Kids sites.","CSK Portal","2020-Present","media/images/cskportal.png","https://parents.compscikids.net/"],
    "Stock Market Analysis": ["A visualization of the effects of COVID-19 upon various stock market sectors like healthcare, technology, and energy to give perspective on the impact of a pandemic on different GICS sectors.","Stock Market Analysis","June 2021","media/images/smp.gif", "https://anandani4136.github.io/Stock-Market-Analysis/"],
    "Qwttr": ["As high school students, we've seen plenty of kids go down the wrong path and take drugs. To combat this issue, we decided to create an app that gives people battling against substance abuse a place to fight against addiction. Qwttr is a feature-rich social media app designed to help people suffering from substance abuse.","DevPost","June 2021","media/images/qwttr2.jpg","https://devpost.com/software/qwttr"],
    "Conant Hack Club Site": ["This website serves as a gallery of projects developed from students in Hack Club, ranging from experimental prototypes to fully-fledged applications. Feel free to visit the link below and check them out!","Conant Hack Club","2021","media/images/hackClub2.jpg","https://conant.hackclub.com/"],
    "Shop Vision": ["An iOS app that uses object classification, text identification, and barcode scanning to determine whether an offered market price for an item is ideal considering competing prices. It uses LiDAR scanning technology to scan and reconstruct larger objects (furniture, appliances) using augmented reality to better understand size and aesthetics of potential purchases.","","2021","media/images/shopVisionPic.jpg",""],
    "A11 SAF3": ["An iOS app that organizes and securely stores private documents/images for quick accessibility. Multi-factor biometric authentication using FaceID and/or TouchID is utilized for unlocking document access.","","2020","media/videos/A11SAF3.gif",""],
    "Dijkstra's Shortest Path Algorithm Game": ["Based off Dijkstra’s Network Routing Algorithm, this game creates random path weightage between points with the player’s objective to gain the least weightage while going from the starting point to the ending point. The game automatically calculates the optimal route and assesses the player’s performance based on their accuracy. It serves as a visual demonstration of Dijkstra’s Algorithm in an interactive format.","Code on GitHub","2019","media/images/pathGame.png","https://anandani4136.github.io/Dijkstras-Algorithm-Game/"]
  };

var loaderOpacity = 1
var x;
var primed = false
// import smoothscroll from 'smoothscroll-polyfill'
// smoothscroll.polyfill();


// var modalShowing = false;
// var modal;
let didScroll = false;
let paralaxTitles = document.querySelectorAll('.paralax-title');
function runMe() {
    document.getElementById("h").innerHTML = "look at me";
    document.getElementById("h").style.color = "red"
}
function runMeAlso() {
    alert("check");
    meToo();

}

function meToo() {
    x = prompt("What is x");
    //need to parseInt to make x a number, try taking the parsint line out
    x=parseInt(x);
    x=x+1;
    alert(x)
    andMe(x);
}




// $(".preview").click(function() { //clicked on the preview
//     console.log("1")
//     $(this).parent().find('.modal').show( "slow", function() { //show the modal
//         // Animation complete.
//         modalShowing = true;
//         modal = $(this).parent().find('.modal');
//     });
// });


// $(".closeModal").click(function() { //want to close the model
//     $(this).parents('.modal').hide( "slow", function() {
//         // Animation complete.
//         modalShowing = false; //modal not showing
//         count = 1;
//         // resetImages();
//     });

// });

// $(document).click(function(e) {
//     if (!$(e.target).closest('.modal-content').length && modalShowing) { //clicked off the modal
//         modal.hide('slow').hide( "slow", function() {
//             // Animation complete.
//             modalShowing = false; //modal not showing
//             // count = 1;
//             // resetImages();
//         });
//     }
// });

// function t() {
//     $('#featuredProjects').click();
// }

// function start() {
//     setTimeout(t, 25);
// }
// if(document.readyState === 'ready' || document.readyState === 'complete' || document.readyState === 'interactive') {
//     // console.log("YES")
//     easeInScreen()
// } else {
//     // console.log("No")
// }

window.onload = function(){ 
    easeInScreen()
    headerAnimate()
    particles()
    cardAnimate()
    modalFunc()
    // carouselFunc()
    scrollProgress()
    
    if(document.readyState === 'ready' || document.readyState === 'complete') {
        // console.log("YES")
        // easeInScreen()

        // if (loaderOpacity > 0){
        //     // setTimeout(easeInScreen, 300);
        // }
        // for(i=0;i<10;i++){
        //     easeInScreen()
        //     wait
        // }
        
        // document.getElementById("loadingScreen").style.opacity = 1
        // document.getElementById("loadingScreen").style.zIndex = -10
    } else {
        // console.log("No")
    }
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function easeInScreen(){
    for(i=0;i<10;i++){
        document.getElementById("loadingScreen").style.opacity = loaderOpacity - 0.1
        loaderOpacity  = loaderOpacity - 0.1
        // console.log(loaderOpacity)
        await sleep(50)
    }
    document.getElementById("loadingScreen").style.height = 0
    document.getElementById("loadingScreen").style.zIndex = -10
}


window.addEventListener('scroll', () => {
          
    cardAnimate()
    headerAnimate()
    scrollProgress()
    
});


function headerAnimate(){
    var bGround = document.getElementsByClassName("background")[0];
    var header = document.getElementsByClassName("scrolls")[0];
    var sticky = innerHeight*0.86;


    var scrollLbl = document.getElementsByClassName("sdcontainer1")[0];
    var navBar = document.getElementsByClassName("navBar")[0];

    if (window.pageYOffset > sticky) {
        // header.style.position = "sticky"
        //document.getElementById("aboutMe").scrollIntoView({ behavior: 'smooth', block: 'end'});


        //console.log("yes")
        header.classList.add("sticky");
        header.style.marginLeft = "0px"
        header.width = "100vw"
        bGround.style.paddingTop = (innerHeight*0.098)+"px"
        scrollLbl.style.visibility = "hidden"//"translateX("+ (window.scrollY - 6*window.innerHeight) / 138 + "%)"
        navBar.style.transform = "translate(0vw,-15vh)"
    } else {
        header.classList.remove("sticky");
        header.style.marginLeft = "-1vw"
        header.width = "101vw"
        bGround.style.paddingTop = "0px"
        // scrollLbl.style.transform = ""
        scrollLbl.style.visibility = "visible"
        navBar.style.transform = "translate(0vw,-15vh)"
    }


    // console.log(scrollY)
    

    // console.log(window.scrollY)

    if(window.scrollY >= 0.96*window.innerHeight){
        if (!primed){
            // console.log(2)
            primed = true
        }
        
    } else {
        primed = false
    }

}



function scrollProgress() {
    // var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    // var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    // var scrolled = (winScroll / height) * 100;
    // console.log(scrolled)
    // console.log(height)
    // console.log(winScroll)
    // console.log(document.getElementById("aboutMe").getBoundingClientRect().top)
    // console.log(document.getElementById("experience").getBoundingClientRect().top)
    var lastIndex = 0
    if(document.getElementById("aboutMe").getBoundingClientRect().top > 0 && document.getElementById("experience").getBoundingClientRect().top > 0){
        var winScroll = document.getElementById("featuredWork").getBoundingClientRect().top;
        var height = document.getElementById("featuredWork").getBoundingClientRect().top - document.getElementById("aboutMe").getBoundingClientRect().top;
        var scrolled = (winScroll / height) * 100;
        document.getElementsByClassName("pageProgress")[0].style.transform = "translate(-21vw,-2vh) translateX("+ scrolled/0.408+ "%)";
        lastIndex = scrolled/0.408
        // document.getElementById("footer").style.visibility = "hidden"
    }
    if(document.getElementById("aboutMe").getBoundingClientRect().top <= 0 && document.getElementById("experience").getBoundingClientRect().top > 0){
        // var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        // var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var winScroll = document.getElementById("aboutMe").getBoundingClientRect().top
        var height = document.getElementById("aboutMe").getBoundingClientRect().top - document.getElementById("experience").getBoundingClientRect().top;
        var scrolled = (winScroll / height) * 100;
        // console.log(document.getElementById("aboutMe").getBoundingClientRect().top - document.getElementById("experience").getBoundingClientRect().top)
        document.getElementsByClassName("pageProgress")[0].style.transform = "translate(-21vw,-2vh) translateX("+ (250+(scrolled/0.408)) + "%)";
        // document.getElementById("footer").style.visibility = "hidden"
    }
    if(document.getElementById("experience").getBoundingClientRect().top <= 0 && document.getElementById("myWork").getBoundingClientRect().top > 0){
        var winScroll = document.getElementById("experience").getBoundingClientRect().top
        var height = document.getElementById("experience").getBoundingClientRect().top - document.getElementById("myWork").getBoundingClientRect().top;
        var scrolled = (winScroll / height) * 100;
        document.getElementsByClassName("pageProgress")[0].style.transform = "translate(-21vw,-2vh) translateX("+ (500+(scrolled/0.390))+ "%)";
        // document.getElementById("footer").style.visibility = "hidden"
        
    }
    // if(document.getElementById("myWork").getBoundingClientRect().top + 100 <= 0){
    //     document.getElementById("footer").style.visibility = "visible"
    // } else {
    //     document.getElementById("footer").style.visibility = "hidden"
    // }
    



  }


function modalFunc(){
    var modal = document.getElementById("myModal");
    var modalHead = document.getElementsByClassName("inModalTitle")[0]
    var modalValue = document.getElementsByClassName("inModalText")[0]
    var modalLink = document.getElementsByClassName("inModalLink")[0]
    var modalCaption = document.getElementsByClassName("captionTxt")[0]
    var modalImage = document.getElementsByClassName("modalImage")[0]
    // Get the button that opens the modal
    var btn = document.getElementsByClassName("projItem");
    var name = document.getElementsByClassName("modalName");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on the button, open the modal 
    // btn.onclick = function() {
    // modal.style.display = "block";
    // }
    
    // console.log(btn.length)
    for (let i = 0; i < btn.length; i++) {
        btn[i].onclick = function() {
            modal.style.display = "block";
            modalHead.innerHTML = (name[i].innerHTML)
            modalValue.innerHTML = (projectDict[name[i].innerHTML][0])
            modalLink.innerHTML = (projectDict[name[i].innerHTML][1])
            modalLink.href = (projectDict[name[i].innerHTML][4])
            modalCaption.innerHTML = (projectDict[name[i].innerHTML][2])
            modalImage.src = (projectDict[name[i].innerHTML][3])
            if (projectDict[name[i].innerHTML][1] != ""){
                document.getElementById("modalLink").href = projectDict[name[i].innerHTML][1]
            }
        };
        
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// function carouselFunc(){
//     var modal = document.getElementById("myModal");
//     var modalHead = document.getElementsByClassName("inModalTitle")[0]
//     var modalValue = document.getElementsByClassName("inModalText")[0]
//     var modalCaption = document.getElementsByClassName("captionTxt")[0]
//     var modalImage = document.getElementsByClassName("modalImage")[0]
//     // Get the button that opens the modal
//     var btn = document.getElementsByClassName("item");
//     var name = document.getElementsByClassName("itemName");
//     // Get the <span> element that closes the modal
//     var span = document.getElementsByClassName("close")[0];
//     // When the user clicks on the button, open the modal 
//     // btn.onclick = function() {
//     // modal.style.display = "block";
//     // }
    
//     // console.log(btn.length)
//     for (let i = 0; i < btn.length; i++) {
//         btn[i].onclick = function() {
//             modal.style.display = "block";
//             modalHead.innerHTML = (name[i].innerHTML)
//             modalValue.innerHTML = (projectDict[name[i].innerHTML][0])
//             modalCaption.innerHTML = (projectDict[name[i].innerHTML][2])
//             modalImage.src = (projectDict[name[i].innerHTML][3])
//         };
        
//     }

//     // When the user clicks on <span> (x), close the modal
//     span.onclick = function() {
//         modal.style.display = "none";
//     }

//     // When the user clicks anywhere outside of the modal, close it
//     window.onclick = function(event) {
//         if (event.target == modal) {
//             modal.style.display = "none";
//         }
//     }
// }


function cardAnimate(){
    var indexCard = document.getElementsByClassName("container1")[0]
    var indexName = document.getElementsByClassName("name")[0]
    var indexPic = document.getElementsByClassName("bioImg2")[0]
    var indexBio = document.getElementsByClassName("bioContainer2")[0]
    var bio = document.getElementsByClassName("container1")[0];
    var innerPic = document.getElementsByClassName("bioImg")[0]
    var innerBioTxt = document.getElementsByClassName("bioContainer")[0]
    var innerBio = document.getElementById("aboutMe");


    /*
        Version 1.0 - Absolute Transitions: Fixed window size
    */


    // if(window.scrollY >= 1000 && window.scrollY <= 2440){
        
    //     indexCard.style.transform = "rotateY("+((window.scrollY - 1000)/8)+"deg)"
    // //     // indexCard.style.transform = "matrix(1, 0, 0.5, 1, 150, 0);"
    // //     indexCard.style.transform = "scale("+ (((window.scrollY - 4000) / 5000)+1) + ") translateY("+ (window.scrollY - 5900) / 4 + "%)"
    // //     // indexCard.style.transform = "translateY("+ (window.scrollY - 5900) / 4 + "%)"
    // }
    // if(window.scrollY >= 1000 && window.scrollY <= 2440){
    //     indexCard.style.transform = "rotateY("+((window.scrollY - 1000)/8)+"deg) scale("+ (((window.scrollY - 1000) / 1000)+1) + ")"
    // }
    // if(window.scrollY <= 1720){
    //     bio.style.visibility = "visible"
    //     indexName.innerHTML = "Ronit Anandani"
    //     indexPic.style.visibility = "hidden"
    //     indexBio.style.visibility = "hidden"
    // }
    // if(window.scrollY > 1720){
    //     indexName.innerHTML = ""
    //     bio.style.visibility = "visible"
    //     indexPic.style.visibility = "visible"
    //     indexBio.style.visibility = "visible"
    //     indexCard.style.transform = "rotateY("+((window.scrollY - 2440)/8)+"deg) scale("+ (((window.scrollY - 1190) / 1000)+1) + ") "
    // }
    // if(window.scrollY >= 2440){
    //     indexCard.style.transform = "scale("+ (((window.scrollY - 1690) / 600)+1) + ")"
    //     // console.log(indexCard.offsetWidth)
    // }
    // if(window.scrollY >= 3100){
    //     indexCard.style.transform = "scale("+ (((3100 - 1690) / 600)+1) + ")"
    //     window.location.hash = '#aboutMe'
    // }
    // if(window.scrollY >= 4750){
    //     bio.style.visibility = "hidden"
    //     indexPic.style.visibility = "hidden"
    //     indexBio.style.visibility = "hidden"
    // }

    var windowHeight = window.innerHeight

    /*
        Version 2.0 - Dynamic Progression: Changes based on window height
    */
    if(window.scrollY >= 0 && window.scrollY < (windowHeight)){
        indexCard.style.transform = ""
    }
    if(window.scrollY >= windowHeight && window.scrollY <= (windowHeight * 2.440)){
        indexCard.style.transform = "rotateY("+((window.scrollY - windowHeight)/(windowHeight*0.008))+"deg)"
    }
    if(window.scrollY >= windowHeight && window.scrollY <= (windowHeight * 2.440)){
        indexCard.style.transform = "rotateY("+((window.scrollY - windowHeight)/(windowHeight*0.008))+"deg) scale("+ (((window.scrollY - windowHeight) / windowHeight)+1) + ")"
    }
    if(window.scrollY <= (windowHeight * 1.720)){
        bio.style.visibility = "visible"
        indexName.innerHTML = "Ronit Anandani"
        indexPic.style.visibility = "hidden"
        indexBio.style.visibility = "hidden"
    }
    if(window.scrollY > (windowHeight * 1.720)){
        indexName.innerHTML = ""
        bio.style.visibility = "visible"
        indexPic.style.visibility = "visible"
        indexBio.style.visibility = "visible"
        indexCard.style.transform = "rotateY("+((window.scrollY - (windowHeight * 2.440))/(windowHeight*0.008))+"deg) scale("+ (((window.scrollY - (windowHeight)) / windowHeight)+1) + ") "
    }
    if(window.scrollY >= (windowHeight * 2.440)){
        indexCard.style.transform = "scale("+ (((window.scrollY - (windowHeight * 1.580)) / (windowHeight*0.6))+1) + ")"
    }
    // if(((((windowHeight * 3.100) - (windowHeight * 1.690)) / (windowHeight*0.6))+1) >= 3.35){
    //     // console.log((((window.scrollY - (windowHeight * 1.580)) / (windowHeight*0.6))+1))
        
    // }
    // console.log(indexPic.getBoundingClientRect())
    if(window.scrollY < (windowHeight * 2.960)){
        innerBioTxt.style.visibility="hidden"
        innerPic.style.visibility="hidden"
        innerBio.style.zIndex = "-2";
        document.getElementsByClassName("bio")[0].style.width = "101vw"
        document.getElementsByClassName("bio")[0].style.marginLeft = "-1vw"
    }
    if(window.scrollY >= (windowHeight * 2.960)){
        indexCard.style.transform = "scale("+ (1) + ")"

        innerBio.style.zIndex = "2";
        innerBioTxt.style.visibility="visible"
        innerPic.style.visibility="visible"

        bio.style.visibility = "hidden"
        indexPic.style.visibility = "hidden"
        indexBio.style.visibility = "hidden"
        document.getElementsByClassName("bio")[0].style.width = "100vw"
        document.getElementsByClassName("bio")[0].style.marginLeft = "0.3vw"
    }


}

async function autoScroll(){
    if(window.pageYOffset > innerHeight*0.86){
        if (window.scrollY < (window.innerHeight * 2.961)){
            window.scrollBy(0, 2)
        }
    }
    
}


function particles(){
    particlesJS('particles-js',
        {
        "particles": {
            "number": {
            "value": 30,
            "density": {
                "enable": true,
                "value_area": 800
            }
            },
            "color": {
            "value": "#ffffff"
            },
            "shape": {
            "type": "triangle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
            },
            "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
            },
            "size": {
            "value": 7,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 4,
                "size_min": 0.1,
                "sync": false
            }
            },
            "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
            },
            "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
            }
        },
        "retina_detect": false,
        "config_demo": {
            "hide_card": false,
            "background_color": "#b61924",
            "background_image": "",
            "background_position": "50% 50%",
            "background_repeat": "no-repeat",
            "background_size": "cover"
        }
        }
    
    );
}

// function bioAutoScroll(){
//     console.log("ok")
//     window.scrollTo(0, 3100);
// }
