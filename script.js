const btn = document.querySelector("#btn");
const content = document.querySelector("#content");
const voice =document.querySelector("#voice");

function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-GB"
    window.speechSynthesis.speak(text_speak)

}

function wishMe(){
    let day = new Date()
    let hours = day.getHours()
    
    if(hours >= 0 && hours < 12){
        speak("Good Morning Sir")
    }
    else if(hours >= 12 && hours < 16){
        speak("Good afternoon sir");
    }else{
        speak("Good Evening sir");
    }
}
window.addEventListener("load",()=>{
   wishMe()
})

// Start Recognization here.

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

let recognization = new speechRecognition()
recognization.onresult = (event)=>{
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerText = transcript
    takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click",()=>{
    recognization.start();
    btn.style.display ="none"
    voice.style.display ="block"

})

function takeCommand(message){
    btn.style.display="flex";
    voice.style.display ="none"
    
    if(message.includes("hello") || message.includes("hey")){
        speak("Hello sir, what can i help you? ");
    }
    else if(message.includes("who are you")){
        speak(" i am virtual assistant ,created by vashu sir.");
    }
   else if(message.includes("open youtube")){
        speak("opening youtube");
        window.open("https://www.youtube.com");
      }
   else if(message.includes("open instagram")){
        speak("opening instagram");
        window.open("https://www.instagram.com");
      }
   else if(message.includes("open google")){
        speak("opening google");
        window.open("https://www.google.com");
      }
   else if(message.includes("open calculator")){
        speak("opening calculator");
        window.open("calculator://");
      }
   else if(message.includes("time")){
        let time = new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"});
        speak(time)
      }
   else if(message.includes("date")){
        let date= new Date().toLocaleString(undefined,{day:"numeric",month:"short"});
        speak(date)
      }
   else {
         let finalText ="this is what i found on internet regarding" + message.replace("ezze","") || message.replace("izze","")
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message.replace("eva","")}`,"_blank");
   }
}
