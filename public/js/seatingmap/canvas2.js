

var myItems = new Array();
var img1 = document.getElementById('scream1');
var withchair = 40;
var heightchair = 40;
var canvas = document.getElementById('Canvas');
var ctx = canvas.getContext('2d');
$(document).ready(function () {
    $.post('/seatingmap/getdata', {}, function (data) {
        //  console.log(data);
      
        for (let item of data.maplist) {
          var i = Number(item.id);
          if (item.state == true) {
            //console.log(i);
            ctx.drawImage(
              img1,
              myItems[i - 1].x,
              myItems[i - 1].y,
              withchair,
              heightchair,
            );
          }
        }
      });


    ctx.font = '5px Arial';

  // Background
  // Yellow zone

  var img = document.getElementById('scream');

  // cửa
  var door = document.getElementById('door');
  ctx.drawImage(door, 10, 130, 100, 100);

  var table = document.getElementById('table');

  // bàn
  ctx.drawImage(table, 70, 10, 250, 130);

  ctx.fillStyle = '#DCDCDC';
  ctx.fillRect(400, 50, 350, 100);

  ctx.fillStyle = '#DCDCDC';
  ctx.fillRect(400, 230, 350, 100);

  ctx.fillStyle = '#DCDCDC';
  ctx.fillRect(400, 410, 350, 100);

  ctx.fillStyle = '#DCDCDC';
  ctx.fillRect(400, 590, 350, 100);

  ctx.fillStyle = '#DCDCDC';
  ctx.fillRect(1000, 50, 350, 100);

  ctx.fillStyle = '#DCDCDC';
  ctx.fillRect(1000, 230, 350, 100);

  ctx.fillStyle = '#DCDCDC';
  ctx.fillRect(1000, 410, 350, 100);

  ctx.fillStyle = '#DCDCDC';
  ctx.fillRect(1000, 590, 350, 100);

  ctx.fillStyle = '#000000';
  ctx.font = '30px Arial';
  ctx.fillText('Student ID', 120, 85);
  ctx.fillText('Entrance', 10, 260);
  ctx.fillStyle = '#000000';

  var length = 37.5; // y
  var k = 420; // x

  function Item(id, x, xfull, y, yfull, status) {
    this.id = id;
    this.x = x;
    this.xfull = xfull;
    this.yfull = yfull;
    this.y = y;
    this.status = status;
  }

  var index = 0;
  for (let i = 0; i < 8; i++) {
    ctx.drawImage(img, k, length, withchair, heightchair);
    ctx.drawImage(img, k + 90, length, withchair, heightchair);
    ctx.drawImage(img, k + 180, length, withchair, heightchair);
    ctx.drawImage(img, k + 270, length, withchair, heightchair);
    myItems.push(
      new Item(++index, k, k + withchair, length, length + heightchair, 0),
    );
    myItems.push(
      new Item(
        ++index,
        k + 90,
        k + 90 + withchair,
        length,
        length + heightchair,
        0,
      ),
    );
    myItems.push(
      new Item(
        ++index,
        k + 180,
        k + 180 + withchair,
        length,
        length + heightchair,
        0,
      ),
    );
    myItems.push(
      new Item(
        ++index,
        k + 270,
        k + 270 + withchair,
        length,
        length + heightchair,
        0,
      ),
    );
    if (i % 2 == 1) length += 100;
    else length += 80;
  }
  length = 37.5; // y
  k = 1020; // x
  for (let i = 0; i < 8; i++) {
    ctx.drawImage(img, k, length, withchair, heightchair);
    ctx.drawImage(img, k + 90, length, withchair, heightchair);
    ctx.drawImage(img, k + 180, length, withchair, heightchair);
    ctx.drawImage(img, k + 270, length, withchair, heightchair);
    myItems.push(
      new Item(++index, k, k + withchair, length, length + heightchair, 0),
    );
    myItems.push(
      new Item(
        ++index,
        k + 90,
        k + 90 + withchair,
        length,
        length + heightchair,
        0,
      ),
    );
    myItems.push(
      new Item(
        ++index,
        k + 180,
        k + 180 + withchair,
        length,
        length + heightchair,
        0,
      ),
    );
    myItems.push(
      new Item(
        ++index,
        k + 270,
        k + 270 + withchair,
        length,
        length + heightchair,
        0,
      ),
    );
    if (i % 2 == 1) length += 100;
    else length += 80;
  }
}, false);
