const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const frames = {
    currentIndex : 0,
    maxIndex : 1345
};
let imagesLoaded = 0;
const images = []

function preloadImages(){
    for(let i = 1; i <= frames.maxIndex; i++){
        const imageUrl = `./frames/frame_${i.toString().padStart(4, "0")}.jpeg`;
        const img = new Image();
        img.src = imageUrl;
        img.onload = ()=>{
            imagesLoaded ++;
            if(imagesLoaded == frames.maxIndex){
                loadImage(frames.currentIndex);
                startAnimation();
            }
        }
        images.push(img) 
    }
}

function loadImage(index){
    if(index >=0 && index <= frames.maxIndex){
        const img = images[index];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY)

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canvas.width - newWidth)/2;
        const offsetY = (canvas.height - newHeight)/2;

        context.clearRect(0,0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

        frames.currentIndex = index;
    }
}

function startAnimation(){
    var tl = gsap.timeline({
        scrollTrigger:{
            trigger: ".parent",
            start: "top top",
            scrub: 1,
        }
    })
    function updateFrame(index){
        return {
            currentIndex: index,
            ease:"linear",
            onUpdate: function (){
            loadImage(Math.floor(frames.currentIndex));
        }
    }
}
tl.to(frames,updateFrame(200), "first")
  .to(".animate1",{opacity:0,ease:"linear"}, "first")

  .to(frames,updateFrame(300), "second")
  .to(".animate2",{opacity:1, ease:"linear"},"second")

  .to(frames,updateFrame(400), "third")
  .to(".animate2",{opacity:1, ease:"linear"},"third")

  .to(frames, updateFrame(500), "fourth")
  .to(".animate2",{opacity:0, ease:"linear"},"fourth")

  .to(frames, updateFrame(600), "fifth")
  .to(".animate3",{opacity:1, ease:"linear"},"fifth")

  .to(frames, updateFrame(700), "sixth")
  .to(".animate3",{opacity:1, ease:"linear"},"sixth")

  .to(frames, updateFrame(800), "seventh")
  .to(".animate3",{opacity:0, ease:"linear"},"seventh")

  .to(frames, updateFrame(900), "eight")
  .to(".panel",{x:"0%", ease:"expo"},"eight")

  .to(frames, updateFrame(1000), "nineth")
  .to(".panel",{x:"0%", ease:"expo"},"nineth")

  .to(frames, updateFrame(1100), "tenth")
  .to(".panel",{opacity:0, ease:"linear"},"tenth")

  .to(frames, updateFrame(1150), "eleventh")
  .to("canvas",{scale:.5, ease:"linear"},"eleventh")

  .to(frames, updateFrame(1200), "twelth")
  .to(".panelism",{opacity:1, ease:"expo"},"twelth")
  
  .to(frames, updateFrame(1200), "twelth")
  .to(".panelism span",{width:200, ease:"expo"},"twelth")

  .to(frames, updateFrame(1300), "thirteen")
  .to("canvas",{scale:1, ease:"expo"},"thirteen")

  .to(frames, updateFrame(1320), "fourteen")
  .to(".panelism",{scale: 2, ease:"circ"},"fourteen")

  .to(frames, updateFrame(1345), "fifteen")
  .to(".panelism",{scale: 2, ease:"circ"},"fifteen")
}
const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)


preloadImages()
window.addEventListener('resize', function(){
    loadImage(Math.floor(frames.currentIndex))
});

document.querySelectorAll(".headings h3").
forEach(function(elem){
    gsap.from(elem,{
        scrollTrigger: {
            trigger: elem,
            start: "top 90%",   
            end: "bottom 20%",
            scrub:2
        },
        opacity:.37
    })
})