let scanner = new Instascan.Scanner({
  video: document.querySelector("#preview"),
  scanPeriod: 1,
  mirror: false
});

scanner.addListener("scan", function (content) {
  document.querySelector('input[name="room"]').value = content;
  document.querySelector("form").submit();
  // window.location.href = `/listequipment?room=${content}`;
});
Instascan.Camera.getCameras()
  .then(function (cameras) {
    if (cameras.length > 1) {
      scanner.start(cameras[1]);
    } else {
      scanner.start(cameras[0]);
      // console.error("No cameras found.");
    }
  })
  .catch(function (e) {
    console.error(e);
  });
