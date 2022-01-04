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
  document.getElementById('cookie-modal-handle')?.click();
  document.getElementById('btn-accept-all')?.addEventListener('click', () => {
    const settings = document.querySelectorAll('#modal-cookie-setting .form-check-input');
    Array.from(settings).forEach(toggler => {
      toggler.checked = true;
    });
  });
});
