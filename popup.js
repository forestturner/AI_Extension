var blessed = require('blessed');
document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      d = document;


      // Create a screen object.
      var screen = blessed.screen({
        smartCSR: true
      });

      screen.title = 'my window title';

      // Create a box perfectly centered horizontally and vertically.
      var box = blessed.box({
        top: 'center',
        left: 'center',
        width: '50%',
        height: '50%',
        content: 'Hello {bold}world{/bold}!',
        tags: true,
        border: {
          type: 'line'
        },
        style: {
          fg: 'white',
          bg: 'magenta',
          border: {
            fg: '#f0f0f0'
          },
          hover: {
            bg: 'green'
          }
        }
      });

      // Append our box to the screen.
      screen.append(box);

      // Add a png icon to the box
      // var icon = blessed.image({
      //   parent: box,
      //   top: 0,
      //   left: 0,
      //   type: 'overlay',
      //   width: 'shrink',
      //   height: 'shrink',
      //   file: __dirname + '/my-program-icon.png',
      //   search: false
      // });

      // If our box is clicked, change the content.
      box.on('click', function(data) {
        box.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
        screen.render();
      });

      // If box is focused, handle `enter`/`return` and give us some more content.
      box.key('enter', function(ch, key) {
        box.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
        box.setLine(1, 'bar');
        box.insertLine(1, 'foo');
        screen.render();
      });

      // Quit on Escape, q, or Control-C.
      screen.key(['escape', 'q', 'C-c'], function(ch, key) {
        return process.exit(0);
      });

      // Focus our element.
      box.focus();

      // Render the screen.
      screen.render();



    });
  }, false);
}, false);







// var f = d.createElement('form');
// f.action = 'http://gtmetrix.com/analyze.html?bm';
// f.method = 'post';
// var i = d.createElement('input');
// i.type = 'hidden';
// i.name = 'url';
// i.value = tab.url;
// f.appendChild(i);
// d.body.appendChild(f);
// f.submit();
