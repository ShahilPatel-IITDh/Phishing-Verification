

        document.querySelectorAll('.action-modal-link').forEach(element => {
          element.addEventListener('click', function d(e){var t=e.target.closest(".footer");t.getElementsByClassName("overlay")[0].style.display="block",t.getElementsByClassName("more-modal")[0].style.display="block"});
        });
      ;
        document.querySelectorAll('.overlay').forEach(element => {
          element.addEventListener('click', function f(e){var t=e.target.closest(".footer");t.getElementsByClassName("overlay")[0].style.display="none",t.getElementsByClassName("more-modal")[0].style.display="none"});
        });
      ;
        document.querySelectorAll('.copy-link').forEach(element => {
          element.addEventListener('click', function h(e,t){navigator.clipboard.writeText(t?"".concat(t,".start.page"):window.location.href),e.target.closest(".footer").getElementsByClassName("copied")[0].textContent="Start Page URL copied!"});
        });
      ;
        document.querySelectorAll('.read-more').forEach(element => {
          element.addEventListener('click', function p(e){var t=e.target.closest("div");t.getElementsByClassName("short-text")[0].classList.toggle("hidden"),t.getElementsByClassName("full-text")[0].classList.toggle("hidden")});
        });
    