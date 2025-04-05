
let quranData = [];
let selectedImage = null;

// تحميل القرآن
async function loadQuran() {
    const response = await fetch('hafs_smart_v8_sample.json'); // تأكد من المسار
    const data = await response.json();
    quranData = data;

    const ayaSelect = document.getElementById('aya-select');
    data.forEach((entry, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = entry.aya_text_emlaey;
        ayaSelect.appendChild(option);
    });

    drawSelectedAya(); // عرض أول آية
}

// اختيار آية من القائمة
function drawSelectedAya() {
    const index = document.getElementById('aya-select').value;
    const text = quranData[index].aya_text_emlaey;
    document.getElementById('quran-text').innerText = text;
    if (selectedImage) drawTextOnImage(text);
}

// رفع صورة
document.getElementById('imageUpload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            selectedImage = img;
            drawSelectedAya(); // رسم النص على الصورة المختارة
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
});

// رسم النص على الصورة
function drawTextOnImage(text) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    ctx.drawImage(selectedImage, 0, 0, canvas.width, canvas.height);
    ctx.font = '32px "Amiri", serif';
    ctx.fillStyle = 'white';
    ctx.fillText(text, 50, 100);
}

// حفظ الصورة
function saveImage() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = 'ayah-image.png';
    link.href = canvas.toDataURL();
    link.click();
}

window.onload = loadQuran;
