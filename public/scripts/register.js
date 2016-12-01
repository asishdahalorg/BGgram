/**
 * Registers the users and saves his/her information on Firebase.
 */
$(function ()
{
    const registermail = document.getElementById('registeremail');
    const registerpass = document.getElementById('registerpass');
    const registerpass2 = document.getElementById('registerpass2');
    const btnlogin = document.getElementById('userlogin');
    const btnusersignup = document.getElementById('usersignup');
    var email;
    var mainpass;

     $("#dialog").hide();

//  After registering now it goes traight to uploads instead of reloading same page. -Kimberly
    function register() {
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email,mainpass);



        promise.then(function() {
            $(document).ready(function() {
                window.location.href = "uploads.html";
                    firebase.auth().onAuthStateChanged(function (user){
                    // Get a reference to the storage service, which is used to create references in your storage bucket.
                        var userData = firebase.database().ref('users/' + user.uid);
                        userData.update
                        ({
                            username: user.displayName,
                            email: user.email,
                            profile_picture: ""
                        });
                    });
            });
        });
        promise.catch(function (error) {
            console.log(error);
        });
    }
    btnusersignup.addEventListener('click',function () {

            email = registermail.value;
            mainpass = registerpass.value;
            const bcpass = registerpass2.value;
            if (mainpass != bcpass){
                $("#dialog").text("");
                $("#dialog").append("Password does not match! Try again");
                $("#dialog").dialog({closeText:"X", title:" An error occur "});
                // $("#invalidpassword").text("Password does not match! Try again.");
            }else {
                const promise = firebase.auth().createUserWithEmailAndPassword(email, mainpass);
                promise.then(function() {

                        $("#usersignup").click(register());
                });
                promise.catch(function (error) {
                    $("#dialog").text("");
                    $("#dialog").append(error.message);
                    $("#dialog").dialog({closeText:"X", title:" An error occur "});
                });
            }
    });
});