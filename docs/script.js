"use strict";

let imgs = [];
let input = null;
let main = null;
let aside = null;
let template = null;

window.addEventListener("DOMContentLoaded", function() {
	main = document.querySelector("main");
	aside = document.querySelector("aside");
	template = document.querySelector("template");
	
	input = document.createElement("input");
	input.type = "file";
	input.multiple = true;
	input.accept = ".jpg, .jpeg, .png, .gif, .webp";
	input.addEventListener("change", function() {
		while (main.firstChild) {
			main.removeChild(main.lastChild);
		}
		
		imgs = Array.from(this.files);
		for (let i=imgs.length-1; i>0; i--) {
			let j = Math.floor(Math.random() * (i+1));
			[imgs[i], imgs[j]] = [imgs[j], imgs[i]];
		}
		
		for (let i=0; i<imgs.length; i++) {
			let clone = null;
			let reader = new FileReader();
			reader.addEventListener("load", function() {
				clone = template.content.cloneNode(true);
				
				clone.querySelector("input").addEventListener("blur", function() {
					if (this.value.length == 0) {
						this.parentNode.parentNode.classList.remove("taken");
					}
					else {
						this.parentNode.parentNode.classList.add("taken");
					}
				});
				
				clone.querySelector("img").src = reader.result;
				clone.querySelector("img").addEventListener("load", function() {
					if (this.width > this.height) {
						this.parentNode.classList.add("landscape");
					}
					else {
						this.parentNode.classList.add("portrait");
					}
				});
				
				main.appendChild(clone);
			});
			reader.readAsDataURL(imgs[i]);
		}
	});
	
	document.querySelector("#toolbox").addEventListener("click", function() {
		aside.classList.toggle("hidden");
	});
	
	document.querySelector("#open").addEventListener("click", function() {
		input.value = "";
		input.click();
	});
	
	document.querySelector("#flip").addEventListener("click", function() {
		main.classList.toggle("flipped");
		this.classList.toggle("active");
	});
	
	document.querySelector("#resize").addEventListener("click", function() {
		main.classList.toggle("big");
		this.classList.toggle("active");
	});
	
	document.querySelector("#ratio").addEventListener("click", function() {
		main.classList.toggle("square");
		this.classList.toggle("active");
	});
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}