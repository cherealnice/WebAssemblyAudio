var Module = {};
document.querySelector('.white-noise').addEventListener('click', function(){
 var context = new AudioContext();
  var node = context.createScriptProcessor(1024, 1, 1);
  var offset = Module._malloc(1024 * 4)
  whiteNoise = Module.cwrap('whiteNoise','number',['number'])
  node.onaudioprocess = function (e) {
    var output = e.outputBuffer.getChannelData(0);
    var doublePtr = Module.HEAPF32.subarray(offset/4, offset/4 + 1024)
    whiteNoise(offset);

    for (var i = 0; i < 1024; i++) {
      output[i] = doublePtr[i]
    }
  };
  node.connect(context.destination);
  setTimeout(function() { context.close() }, 3000)
});
