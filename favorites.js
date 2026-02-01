import{o as d}from"./assets/scroll-up-Bd-b3WRV.js";const a=document.querySelector(".js-favorites-list"),r=document.querySelector(".js-favorites-empty");function v(t){return t.map(({_id:e,name:i,burnedCalories:s,time:n,bodyPart:c,target:l})=>`
    <li class="exercises-item exercise-card-details" data-id="${e}">
      <div class="exercise-card-top">
        <span class="exercise-badge">WORKOUT</span>
        <button class="favorites-remove-btn js-remove-btn" data-id="${e}" aria-label="Remove">
          <svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" fill="none">
            <path d="M3 3L13 13M3 13L13 3" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        
        <button class="exercise-start-btn js-start-btn" data-id="${e}">
          Start
          <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/></svg>
        </button>
      </div>
      
      <div class="exercise-card-title">
        <div class="exercise-icon-run">
            <svg viewBox="0 0 32 32"><path d="M7 29.5l-5-4 3.5-3.5 3.5 2.5 4-5-3-3.5 1-4.5 4-2.5 3.5-3.5-1.5-3.5 4.5-2 3 3-1 4.5-5 3.5-2 4 1.5 1.5 3.5-0.5 3 2.5-0.5 3.5-4.5 1-4-2.5-3 2.5z"></path></svg>
        </div>
        <h3 class="exercise-title-text">${i}</h3>
      </div>

      <ul class="exercise-info-list">
        <li class="exercise-info-item">Burned calories:<span class="exercise-info-value">${s} / ${n} min</span></li>
        <li class="exercise-info-item">Body part:<span class="exercise-info-value">${c}</span></li>
        <li class="exercise-info-item">Target:<span class="exercise-info-value">${l}</span></li>
      </ul>
    </li>
  `).join("")}function o(){const t=JSON.parse(localStorage.getItem("favorites"))||[];t.length===0?(a.innerHTML="",r.classList.remove("is-hidden")):(r.classList.add("is-hidden"),a.innerHTML=v(t))}a.addEventListener("click",t=>{const e=t.target.closest(".js-remove-btn");if(e){const s=e.dataset.id;f(s);return}const i=t.target.closest(".js-start-btn");if(i){const s=i.dataset.id;d(s)}});function f(t){const i=(JSON.parse(localStorage.getItem("favorites"))||[]).filter(s=>s._id!==t);localStorage.setItem("favorites",JSON.stringify(i)),o()}function u(){document.querySelectorAll(".nav-link").forEach(e=>{e.classList.remove("active"),e.getAttribute("href").includes("favorites.html")&&e.classList.add("active")})}document.addEventListener("DOMContentLoaded",()=>{u(),o()});
//# sourceMappingURL=favorites.js.map
