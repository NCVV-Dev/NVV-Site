function animateValue(e,n,t,a){let i=null,l=m=>{i||(i=m);let o=Math.min((m-i)/a,1);e.innerHTML=Math.floor(o*(t-n)+n),o<1&&window.requestAnimationFrame(l)};window.requestAnimationFrame(l)}const obj=document.getElementById("value");animateValue(obj,0,2500,2e3);