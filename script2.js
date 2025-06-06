function checkRights() {
    const footerText = document.getElementById('footer').textContent;
    if (!footerText.includes('Al-Hassan Al-Dabaa')) {
        alert('Warning: changed Copyright. Tool will stop working.');
        disableCalculator();
    }
}
function disableCalculator() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.disabled = true);
}

function encryptLink() {
            var baseUrl = document.getElementById("baseUrl").value;
            var extraMessage = document.getElementById("extraMessage").value;
            var encryptedMessage = encodeURIComponent(extraMessage); // تشفير الرسالة بصيغة URL
            var encryptedLink = baseUrl + "?text=" + encryptedMessage;
            document.getElementById("encryptedLink").value = encryptedLink;
        }

        function encryptText() {
            var text = document.getElementById("textToEncrypt").value;
            var encryptedText = encodeURIComponent(text); // تشفير النص بصيغة URL
            document.getElementById("encryptedText").value = encryptedText;
        }

        function decryptText() {
            var encryptedText = document.getElementById("textToDecrypt").value;
            var decryptedText;

            try {
                decryptedText = decodeURIComponent(encryptedText);
            } catch (e) {
                decryptedText = "خطأ: نص مشفر غير صالح!";
            }

            document.getElementById("decryptedText").value = decryptedText;
        }

        function copyToClipboard(id) {
            var copyText = document.getElementById(id);
            copyText.select();
            document.execCommand("copy");
            alert("تم نسخ النص: " + copyText.value);
        }

        function showAd() {
            var ads = document.getElementsByClassName("ad");
            var randomIndex = Math.floor(Math.random() * ads.length); ads[randomIndex].style.display = "block";
        }

        setInterval(showAd, 60000); // عرض إعلان كل  دقيقة ( 60000مللي uثانية)