function checkFiles(files) {
    console.log(files);

    if (files.length !== 1) {
        alert("Bitte genau eine Datei hochladen.");
        return;
    }

    const fileSize = files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 10) {
        alert("Datei zu groß (max. 10Mb).");
        return;
    }

    document.getElementById('loading').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    
    const file = files[0];

    // Preview
    if (file) {
        const preview = document.getElementById('preview');
        preview.src = URL.createObjectURL(file);
    }

    // Upload
    const formData = new FormData();
    formData.append("image", file);

    fetch('/analyze', {
        method: 'POST',
        body: formData
    }).then(response => response.text())
      .then(text => {
          document.getElementById('loading').style.display = 'none';
          document.getElementById('result').style.display = 'block';
          document.getElementById('answer').innerHTML = text;
      })
      .catch(error => {
          console.error('Error:', error);
          alert('Fehler bei der Bildanalyse. Bitte versuchen Sie es erneut.');
      });
}
