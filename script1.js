function checkRights() {
    const footerText = document.getElementById('footer').textContent;
    if (!footerText.includes('Al-Hassan Al-Dabaa')) {
        alert('Warning: changed Copyright. Tool will stop working.');
        disableCalculator();
    }
}
function disableCalculator() {
    const inputs = document.querySelectorAll('textarea');
    inputs.forEach(input => input.disabled = true);
}

// تحويل النصوص إلى رموز HTML
function convertToHTMLEntity() {
    const input = document.getElementById('input-text').value;

    // تحويل الأحرف إلى ترميز HTML باستخدام DOM
    const encodedText = input.replace(/[\s\S]/g, (char) => {
        return `&#${char.charCodeAt(0)};`;
    });

    // عرض النص المحوّل
    document.getElementById('output-text').value = encodedText;
}

// نسخ النص المشفر إلى الحافظة
function copyToClipboard() {
    const outputText = document.getElementById('output-text');
    outputText.select(); // تحديد النص
    document.execCommand('copy'); // نسخ النص
    alert('Been to copy the text encrypted to clipboard!');
}

// مسح النصوص المدخلة والمحوّلة
function clearInput() {
    document.getElementById('input-text').value = ''; // مسح النص المدخل
    document.getElementById('output-text').value = ''; // مسح النص الناتج
}
