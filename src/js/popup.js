import { getFromStorage } from "./storage.js";

export function popupOverlay(last, type) {
  
  return  `<div class="popup-overlay">
  <div class="popup">
    <div class="popup-header">
      <h2>Last ${type} conversion</h2>
      <button class="close-btn">&times;</button>
    </div>
    <div class="popup-content">
      <p> ${last} </p>
    </div>
    <div class="popup-footer">
      <button class="primary-btn">Got It</button>
    </div>
  </div>
</div>
`}

  export function showPopup(lastConversion, type) {
     const last = getFromStorage(lastConversion);
     if(last){
        const popupHTML = popupOverlay(last, type);
        document.body.insertAdjacentHTML('beforeend', popupHTML);
        const popup = document.querySelector('.popup-overlay');
        const closeBtn = popup.querySelector('.close-btn');
        const gotItBtn = popup.querySelector('.primary-btn');

        function closePopup() {
          popup.remove();
        }

        closeBtn.addEventListener('click', closePopup);
        gotItBtn.addEventListener('click', closePopup);
     }
  }  
