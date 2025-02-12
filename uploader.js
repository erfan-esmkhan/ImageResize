document.addEventListener('DOMContentLoaded', function() {
    const imageInput = document.getElementById('imageInput');
    const preview = document.getElementById('preview');
    const widthInput = document.getElementById('width');
    const heightInput = document.getElementById('height');
    const downloadBtn = document.getElementById('downloadBtn');
    let originalImage = null;

    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            originalImage = new Image();
            originalImage.src = event.target.result;

            originalImage.onload = function() {
                widthInput.value = originalImage.width;
                heightInput.value = originalImage.height;
                preview.src = originalImage.src;
                preview.style.display = 'block';
            }
        }

        reader.readAsDataURL(file);
    });

    downloadBtn.addEventListener('click', function() {
        const width = parseInt(widthInput.value);
        const height = parseInt(heightInput.value);

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(originalImage, 0, 0, width, height);

        const resizedImage = canvas.toDataURL('image/jpeg', 0.8);
        
      
        const downloadLink = document.createElement('a');
        downloadLink.download = 'resized-image.jpg';
        downloadLink.href = resizedImage;
        downloadLink.click();
    });
});
