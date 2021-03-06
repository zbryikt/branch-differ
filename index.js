// Generated by LiveScript 1.2.0
$(document).ready(function(it){
  var parent, ref$, w, h, block, fw, fx, left, right, i$, len$, o, x, y, doPath, x$, y$;
  parent = $('.ui.diff');
  ref$ = [parent.outerWidth(), parent.outerHeight()], w = ref$[0], h = ref$[1];
  block = $('.ui.block');
  fw = parseInt(w * 0.4);
  fx = ($(block[0]).outerWidth() - fw) / 2;
  left = [];
  right = [];
  for (i$ = 0, len$ = block.length; i$ < len$; ++i$) {
    it = block[i$];
    it = $(it);
    o = it.offset();
    ref$ = [o.left, o.top + it.outerHeight() / 2], x = ref$[0], y = ref$[1];
    if (!it.hasClass('right')) {
      left.push([x, y]);
    }
    if (!it.hasClass('left')) {
      right.push([x, y]);
    }
  }
  doPath = function(v){
    var lt, yy, res$, i$, len$, it, x, cy, ret, zz;
    lt = 0;
    res$ = [];
    for (i$ = 0, len$ = v.length; i$ < len$; ++i$) {
      it = v[i$];
      x = it[0] + fx;
      cy = lt
        ? (lt[1] + it[1]) / 2
        : it[1];
      ret = !lt
        ? "M" + x + " " + it[1]
        : "C" + lt[0] + " " + cy + " " + x + " " + cy + " " + x + " " + it[1];
      lt = it;
      res$.push(ret);
    }
    yy = res$;
    v = v.reverse();
    res$ = [];
    for (i$ = 0, len$ = v.length; i$ < len$; ++i$) {
      it = v[i$];
      x = it[0] + fx;
      cy = lt
        ? (lt[1] + it[1]) / 2
        : it[1];
      ret = !lt
        ? "L" + (x + fw) + " " + it[1]
        : "C" + (lt[0] + fw) + " " + cy + " " + (x + fw) + " " + cy + " " + (x + fw) + " " + it[1];
      lt = it;
      res$.push(ret);
    }
    zz = res$;
    return yy.join("") + zz.join("") + "Z";
  };
  x$ = d3.selectAll('.ui.diff').append('svg');
  x$.attr('class', "ui flow").attr('width', w).attr('height', h);
  x$.append('path').attr('class', 'left').attr('d', function(){
    return doPath(left);
  });
  y$ = d3.selectAll('.ui.diff').append('svg');
  y$.attr('class', "ui flow").attr('width', w).attr('height', h);
  y$.append('path').attr('class', 'right').attr('d', function(){
    return doPath(right);
  });
  return y$;
});