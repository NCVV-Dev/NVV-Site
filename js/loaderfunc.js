document.addEventListener("DOMContentLoaded",function e(){let t=document.getElementById("progress"),n=document.images,o=0,r=n.length;if(0==r)return l();function i(){let e=(100/r*(o+=1)<<0)+"%";if(t.style.width=e,o===r)return l()}function l(){setTimeout(function(){t.style.opacity="none",t.style.opacity=0},1800)}for(let s=0;s<r;s+=1){let $=new Image;$.onload=i,$.onerror=i,$.src=n[s].src}},!1);