let t=document.getElementById("nf__popup");function switchrandomizing(){"true"==getCookie("EnableShuffle")?(setCookie("EnableShuffle","false",365),localStorage.setItem("enableshuffle","false"),t.style.color="let(--warn)",t.innerHTML="Visual config shuffle disabled",t.className="show",setTimeout(function(){t.className=t.className.replace("show","")},3e3)):(setCookie("EnableShuffle","true",365),localStorage.setItem("enableshuffle","true"),t.style.color="let(--buttonsubmitbg)",t.innerHTML="Visual config shuffle enabled!",t.className="show",setTimeout(function(){t.className=t.className.replace("show","")},3e3))}$(function(){if("true"==getCookie("EnableShuffle")&&"true"==localStorage.getItem("enableshuffle")){let e=$("#randomize"),l=e.children();l.sort(function(e,l){return .5-Math.random()}),e.append(l),t.style.color="let(--buttonsubmitbg)",t.innerHTML="Shuffling visual configs...",t.className="show",setTimeout(function(){t.className=t.className.replace("show","")},3e3)}else localStorage.setItem("enableshuffle","false"),setCookie("EnableShuffle","false",365)});