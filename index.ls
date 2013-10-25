<- $ document .ready
parent = $ \.ui.diff
[w,h] = [parent.outerWidth!, parent.outerHeight!]
block = $ \.ui.block
fw = parseInt(w * 0.4)
fx = ( $(block.0)outerWidth! - fw ) / 2

left = []
right = []
for it in block
  it = $ it
  o = it.offset!
  [x, y] = [o.left, o.top + it.outerHeight!/2 ]
  if !(it.hasClass \right) => left.push [x,y]
  if !(it.hasClass \left) => right.push [x,y]
do-path = (v) ->
  lt = 0
  yy = for it in v =>
    x = it.0 + fx
    cy = if lt => ( lt.1 + it.1 ) / 2 else it.1
    ret = if !lt => "M#{x} #{it.1}"
    else "C#{lt.0} #{cy} #{x} #{cy} #{x} #{it.1}"
    lt = it
    ret
  v = v.reverse!
  zz = for it in v =>
    x = it.0 + fx
    cy = if lt => ( lt.1 + it.1 ) / 2 else it.1
    ret = if !lt => "L#{x + fw} #{it.1}"
    else "C#{lt.0 + fw} #{cy} #{x + fw} #{cy} #{x + fw} #{it.1}"
    lt = it
    ret
  yy.join("") + zz.join("") + "Z"

d3.selectAll \.ui.diff .append \svg
  ..attr \class "ui flow" .attr \width w .attr \height h
  ..append \path
    .attr \class \left
    .attr \d -> do-path left

d3.selectAll \.ui.diff .append \svg
  ..attr \class "ui flow" .attr \width w .attr \height h
  ..append \path
    .attr \class \right
    .attr \d -> do-path right
