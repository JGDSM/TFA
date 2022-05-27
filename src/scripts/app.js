"use strict";
import { gsap } from "gsap";

var mWrap = document.querySelectorAll(".magnetic-wrap");

function parallaxIt(e, wrap, movement = 1) {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var boundingRect = wrap.mArea.getBoundingClientRect();
  var halfDiff = Math.abs(boundingRect.width - boundingRect.height) / 2;
  var relX = e.pageX - boundingRect.left - halfDiff;
  var relY = e.pageY - boundingRect.top;

  gsap.to(wrap.mContent, {
    x: (relX - boundingRect.width / 2) * movement,
    y: (relY - boundingRect.height / 2 - scrollTop) * movement,
    ease: "power1",
    duration: 0.6
  });
}

mWrap.forEach(function (wrap) {
  wrap.mContent = wrap.querySelector(".js-magnetic-content");
  wrap.mArea = wrap.querySelector(".js-magnetic-area");
  
  wrap.mArea.addEventListener("mousemove", function(e) {
    parallaxIt(e, wrap);
  });
  
  wrap.mArea.addEventListener("mouseleave", function (e) {
    gsap.to(wrap.mContent, {
      scale: 1,
      x: 0,
      y: 0,
      ease: "power3",
      duration: 0.6
    });
  });
});
