var memory = new WebAssembly.Memory({ initial: 1024 });
var instance;

function fetchAndInstantiate(url, importObject) {
  return fetch(url).then(response =>
      response.arrayBuffer()
    ).then(bytes =>
      WebAssembly.instantiate(bytes, importObject)
    ).then(results =>
      instance = results.instance
    );
}

fetchAndInstantiate('/index.wasm', { env: { memory: memory } })

document.querySelector('.play').addEventListener('click', function(){
  fetch('https://upload.wikimedia.org/wikipedia/en/4/45/ACDC_-_Back_In_Black-sample.ogg')
    .then(function(res) {
      return res.arrayBuffer();
    })
    .then(function(buffer) {
      var offset = instance.exports.getData();
      var context = new AudioContext({ sampleRate: 48000 });
      var node = context.createScriptProcessor(1024, 1, 1);
      var bufferArray = new Uint32Array(instance.exports.memory.buffer, offset, 1024);
      buffer = new Uint32Array(buffer.slice(0, 1024));
      for (var i = 0; i < 1024; i++) {
        bufferArray[i] = buffer[i]
      }

      node.onaudioprocess = function (e) {
        var output = e.outputBuffer.getChannelData(0);
        instance.exports.play();

        for (var i = 0; i < 1024; i++) {
          output[i] = bufferArray[i]
        }

      };
      node.connect(context.destination);
      setTimeout(function() { context.close() }, 3000)
    })
});
