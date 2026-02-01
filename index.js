import{o as $,Y as y}from"./assets/scroll-up-Bd-b3WRV.js";const S=new y,o=document.querySelector(".js-exercises-list"),m=document.querySelector(".js-filter-list"),l=document.querySelector(".js-pagination"),c=document.querySelector(".js-search-form"),w=document.querySelector(".exercises-title");let d="Muscles",g="",a=1,v="",f=!1;function T(s){return s.map(({name:t,filter:e,imgUrl:r})=>`
    <li class="exercises-item js-category-item" data-name="${t}" data-filter="${e}">
      <div class="exercise-card" 
           style="background: linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${r}'); background-size: cover; background-position: center;">
        <h3 class="exercise-name">${t}</h3>
        <p class="exercise-filter">${e}</p>
      </div>
    </li>
  `).join("")}function E(s){return s.map(({_id:t,name:e,rating:r,burnedCalories:n,time:i,bodyPart:M,target:C})=>`
    <li class="exercises-item exercise-card-details" data-id="${t}">
      <div class="exercise-card-top">
        <span class="exercise-badge">WORKOUT</span>
        <div class="exercise-rating-block">
          <span class="exercise-rating-text">${String(r).padEnd(3,".0")}</span>
          <svg class="exercise-star-icon" viewBox="0 0 32 32"><path d="M16 2 L20.32 10.75 L30 12.16 L23 18.98 L24.65 28.63 L16 24.08 L7.35 28.63 L9 18.98 L2 12.16 L11.68 10.75 Z"></path></svg>
        </div>
        <button class="exercise-start-btn js-start-btn" data-id="${t}">
          Start
          <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/></svg>
        </button>
      </div>
      
      <div class="exercise-card-title">
        <div class="exercise-icon-run">
            <svg viewBox="0 0 32 32"><path d="M7 29.5l-5-4 3.5-3.5 3.5 2.5 4-5-3-3.5 1-4.5 4-2.5 3.5-3.5-1.5-3.5 4.5-2 3 3-1 4.5-5 3.5-2 4 1.5 1.5 3.5-0.5 3 2.5-0.5 3.5-4.5 1-4-2.5-3 2.5z"></path></svg>
        </div>
        <h3 class="exercise-title-text">${e}</h3>
      </div>

      <ul class="exercise-info-list">
        <li class="exercise-info-item">Burned calories:<span class="exercise-info-value">${n} / ${i} min</span></li>
        <li class="exercise-info-item">Body part:<span class="exercise-info-value">${M}</span></li>
        <li class="exercise-info-item">Target:<span class="exercise-info-value">${C}</span></li>
      </ul>
    </li>
  `).join("")}function q(s,t){let e="";const r=Math.min(s,5);for(let n=1;n<=r;n++)e+=`<li><button class="pagination-btn ${n===t?"active":""}" data-page="${n}">${n}</button></li>`;l.innerHTML=e}async function h(s,t=1){f=!1,v="",c&&(c.classList.add("is-hidden"),c.reset()),w.textContent="Exercises",document.querySelector(".js-category-title").textContent="",o.innerHTML='<p style="text-align:center; width:100%">Loading categories...</p>';try{const e=await S.getFilters(s,t,12);o.innerHTML=T(e.results),e.totalPages>1?q(e.totalPages,t):l.innerHTML=""}catch(e){console.error(e),o.innerHTML="<p>Error loading categories</p>"}}async function L(s,t,e=1){f=!0,c&&c.classList.remove("is-hidden");let r="";t==="Muscles"&&(r="muscles"),t==="Body parts"&&(r="bodypart"),t==="Equipment"&&(r="equipment");const n=document.querySelector(".js-category-title");n.textContent=`/ ${s.charAt(0).toUpperCase()+s.slice(1)}`,o.innerHTML='<p style="text-align:center; width:100%">Loading exercises...</p>';try{const i=await S.getExercises({[r]:s,page:e,limit:10,keyword:v});if(i.results.length===0){o.innerHTML='<p style="text-align:center; width:100%">No exercises found.</p>',l.innerHTML="";return}o.innerHTML=E(i.results),i.totalPages>1?q(i.totalPages,e):l.innerHTML=""}catch(i){console.error(i),o.innerHTML="<p>Error loading exercises</p>"}}c&&c.addEventListener("submit",s=>{s.preventDefault(),v=s.currentTarget.elements.search.value.trim(),a=1,L(g,d,a)});m&&m.addEventListener("click",s=>{var t;s.target.nodeName==="BUTTON"&&(s.target.classList.contains("active")&&!f||((t=m.querySelector(".active"))==null||t.classList.remove("active"),s.target.classList.add("active"),d=s.target.dataset.filter,a=1,g="",h(d,a)))});o&&o.addEventListener("click",s=>{const t=s.target.closest(".js-category-item");if(t&&!f){const r=t.dataset.name,n=t.dataset.filter;g=r.toLowerCase(),a=1,L(g,n,a);return}const e=s.target.closest(".js-start-btn");if(e){const r=e.dataset.id;$(r)}});l&&l.addEventListener("click",s=>{const t=s.target.closest(".pagination-btn");if(!t)return;const e=Number(t.dataset.page);e!==a&&(a=e,f?L(g,d,a):h(d,a),document.querySelector(".exercises").scrollIntoView({behavior:"smooth"}))});function j(){h("Muscles")}const H=new y,p=document.querySelector(".js-quote-text"),x=document.querySelector(".js-quote-author"),b="quoteOfTheDay";function k(){const s=new Date,t=String(s.getDate()).padStart(2,"0"),e=String(s.getMonth()+1).padStart(2,"0"),r=s.getFullYear();return`${t}/${e}/${r}`}async function B(){if(!p)return;const s=k(),t=JSON.parse(localStorage.getItem(b));if(t&&t.date===s){p.textContent=t.quote,x.textContent=t.author;return}try{const e=await H.getQuote();p.textContent=e.quote,x.textContent=e.author,localStorage.setItem(b,JSON.stringify({quote:e.quote,author:e.author,date:s}))}catch(e){console.error("Error fetching quote:",e),p.textContent="Your energy is your greatest strength.",x.textContent="Unknown"}}const P=new y,u=document.querySelector(".js-footer-form");u&&u.addEventListener("submit",async s=>{s.preventDefault();const t=u.elements.email.value.trim();if(!t)return;const e=u.querySelector("button"),r=e.textContent;e.textContent="Sending...",e.disabled=!0;try{const n=await P.subscribe(t);alert(`Success! ${n.message||"You have subscribed."}`),u.reset()}catch(n){alert("Subscription failed. Maybe this email is already subscribed?"),console.error(n)}finally{e.textContent=r,e.disabled=!1}});document.addEventListener("DOMContentLoaded",()=>{j(),B()});
//# sourceMappingURL=index.js.map
