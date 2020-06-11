

const { desktopCapturer, remote } = require('electron');

const { writeFile } = require('fs');

const { dialog, Menu } = remote;
 const axios  = require('axios');

const password=document.getElementById('password');
const email =document.getElementById('email');
const signup = document.querySelector('#signup')
// Global state
let mediaRecorder; // MediaRecorder instance to capture footage
const recordedChunks = [];

// Buttons
const videoElement = document.querySelector('video');



var isAuthenticated, token,userId;

function autoAuthUser() {
  const authInformation = getAuthData();
  if (!authInformation) {
    return;
  }
  const now = new Date();
  const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
  if (expiresIn > 0) {
    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.userId = authInformation.userId;
    this.setAuthTimer(expiresIn / 1000);
    this.authStatusListener.next(true);
  }
}
autoAuthUser();
function logout() {
  this.token = null;
  this.isAuthenticated = false;
  this.authStatusListener.next(false);
  this.userId = null;
  clearTimeout(this.tokenTimer);
  this.clearAuthData();
  this.router.navigate(["/"]);
}

function setAuthTimer(duration) {
  console.log("Setting timer: " + duration);
  this.tokenTimer = setTimeout(() => {
    this.logout();
  }, duration * 1000);
}



function saveAuthData(token, expirationDate, userId) {
  localStorage.setItem("token", token); 
  localStorage.setItem("expiration", expirationDate.toISOString());
  localStorage.setItem("userId", userId);
}



function clearAuthData() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  localStorage.removeItem("userId");
}




function getAuthData() {
  const token = localStorage.getItem("token");
  const expirationDate = localStorage.getItem("expiration");
  const userId = localStorage.getItem("userId");
  if (!token || !expirationDate) {
    return;
  }
  return {
    token: token,
    expirationDate: new Date(expirationDate),
    userId: userId
  };
}





        signup.onclick = (e) => {
          const user = {
            email: email.value,
            password: password.value,
          };
          axios
            .post("http://localhost:5000/user/signup", user)
            .then((res) => 
            {
              if (res) 
              {
               // login.click();
                console.log("posted");
                console.log(res.data);
                signup.innerText = "Signedup";
                //signup.innerText="Signedup2".;
                // const user = res.data.map((user) => 
                // {
                // return { title: user.title, completed: user.completed };
                // });


              }
            })
            .catch((err) => {
              console.log(err);
            });
        };













login.onclick=e=>{
  const user =
  {
     email: email.value,
     password: password.value
  }
  console.log(user);
  axios.post("http://localhost:5000/user/login",user).
  then(res=>{
    if(res)

    /**
     * returns expiresin @miliseconds
     * tokenm @token
     * userId @_id_at_backend
     */
    console.log((res))
     const token=res.body.token;
   

     this.token = "ho";
     console.log(this.token)  
     if(token)
     {
      
       const expiresInDuration = res.expiresIn;
       this.setAuthTimer(expiresInDuration);
       //tells whether the user is authenticatd then he /she will be able to modify the daata
       this.isAuthenticated = true;
       console.log(isAuthenticated);
       this.userId = res.userId;
       const now = new Date();
       //because the expiration time is always releveant to the time of  new roload
       //so to prevent this ,it is used

       const expirationDate = new Date(
         now.getTime() + expiresInDuration * 1000
       );
       console.log(expirationDate);
       this.saveAuthData(token, expirationDate, this.userId);
        
     }
     console.log(res)
    //const user =res.data.map(user=>{return( {email: user.email ,password :user.password})})
  })
  .catch(err=>{
    console.log("from side of error ")
    console.log(err);
  })

}
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const videoSelectBtn = document.getElementById('videoSelectBtn');
if(true)
  {
   startBtn.className="btn btn-dark";
   stopBtn.className="btn btn-dark";
   videoSelectBtn.className="btn btn-dark"
  }
if(isAuthenticated){
startBtn.onclick = e => {

  {
  mediaRecorder.start();
  startBtn.classList.add('is-danger');
  startBtn.innerText = 'Recording';}
};



stopBtn.onclick = e => {
  mediaRecorder.stop();
  startBtn.classList.remove('is-danger');
  startBtn.innerText = 'Start';
};


videoSelectBtn.onclick = getVideoSources;

// Get the available video sources
async function getVideoSources() {
  const inputSources = await desktopCapturer.getSources({
    types: ['window', 'screen']
  });

  const videoOptionsMenu = Menu.buildFromTemplate(
    inputSources.map(source => {
      return {
        label: source.name,
        click: () => selectSource(source)
      };
    })
  );


  videoOptionsMenu.popup();
}

// Change the videoSource window to record
async function selectSource(source) {

  videoSelectBtn.innerText = source.name;

  const constraints = {
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: source.id
      }
    }
  };

  // Create a Stream
  const stream = await navigator.mediaDevices
    .getUserMedia(constraints);

  // Preview the source in a video element
  videoElement.srcObject = stream;
  videoElement.play();

  // Create the Media Recorder
  const options = { mimeType: 'video/webm; codecs=vp9' };
  mediaRecorder = new MediaRecorder(stream, options);

  // Register Event Handlers
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.onstop = handleStop;

  // Updates the UI
}

// Captures all recorded chunks
function handleDataAvailable(e) {
  console.log('video data available');
  recordedChunks.push(e.data);
}

// Saves the video file on stop
async function handleStop(e) {
  const blob = new Blob(recordedChunks, {
    type: 'video/webm; codecs=vp9'
  });

  const buffer = Buffer.from(await blob.arrayBuffer());

  const { filePath } = await dialog.showSaveDialog({
    buttonLabel: 'Save video',
    defaultPath: `vid-${Date.now()}.webm`
  });

  if (filePath) {
    writeFile(filePath, buffer, () => console.log('video saved successfully!'));
  }

}
}