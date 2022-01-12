function handleVideoButton(e) {
  e.preventDefault();
  const container = document.querySelector(`.${e.target.id}-container`);
  const wrapper = document.createElement('div');
  wrapper.style.width = "100%";
  wrapper.style.position = "relative";
  const closeBtn = document.createElement('div');
  closeBtn.className = "btn-video-close";
  closeBtn.style.zIndex = "1";
  const closeIcon = document.createElement('i');
  closeIcon.className = "btn-video-close-icon fa fa-times";
  closeBtn.appendChild(closeIcon);
  closeBtn.addEventListener('click', () => {
    container.style.display = "block";
    wrapper.remove();
  });
  wrapper.appendChild(closeBtn);
  const video = document.createElement('video');
  video.style.width = "100%";
  video.style.objectFit = "cover";
  video.style.objectPosition = "center";
  video.style.display = "block";
  video.autoplay = true;
  video.controls = true;
  const source = document.createElement("source");
  source.type = "video/mp4";
  source.src = e.target.href;
  video.appendChild(source);
  video.onended = () => {
    container.style.display = "block";
    wrapper.remove();
  };
  wrapper.appendChild(video);
  container.parentElement.insertBefore(wrapper, container);
  container.style.display = "none";
}

function initCookie() {
  document.getElementById('cookie-modal-handle')?.click();
  document.getElementById('btn-accept-all')?.addEventListener('click', () => {
    const settings = document.querySelectorAll('#modal-cookie-setting .form-check-input');
    Array.from(settings).forEach(toggler => {
      toggler.checked = true;
    });
  });
}

var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

function initTypewriter() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
}


window.addEventListener('DOMContentLoaded', () => {
  // Setup parallax sections
  new universalParallax().init({
    speed: 4.0
  });

  // Add Video button listeners
  Array.from(document.getElementsByClassName('video-button')).forEach(btn => {
    btn.addEventListener('click', handleVideoButton);
  });

  // Overlay text appearing detection  
  const inViewport = (entries, observer) => {
    entries.forEach(entry => {
      entry.target.classList.toggle("is-in-viewport", entry.isIntersecting);
    });
  };

  const Obs = new IntersectionObserver(inViewport);
  const obsOptions = {};

  // Attach observer to every .overlay-text element:
  const ELs_inViewport = document.querySelectorAll('.overlay-text');
  ELs_inViewport.forEach(EL => {
    Obs.observe(EL, obsOptions);
  });

  // Cookie dialog handler
  initCookie();

  initTypewriter();
});
