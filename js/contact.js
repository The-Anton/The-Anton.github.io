console.log("added");

function sendMail(){
    console.log=("sending mail....");
  var name = document.getElementById("nameInput").value;
  var email = document.getElementById("emailInput").value;
  var userMsg = document.getElementById("msg-box").value;
  Email.send({

      Host : 'smtp.gmail.com',
      Username : "reg.igpixel@gmail.com",
      Password : "igpixel123",
      To : "shekhar59324@gmail.com",
      From : `${email}`,
      Subject : `${name}Portfolio Contact Message`,
      Body : `<h3 text-align="center" > ${userMsg} </h>`
  }).then(
      message => alert("I will surely get back to you... 😃")
  );
}