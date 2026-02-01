(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(t){if(t.ep)return;t.ep=!0;const a=n(t);fetch(t.href,a)}})();const c="https://your-energy.b.goit.study/api";class ${async getQuote(){return(await fetch(`${c}/quote`)).json()}async getFilters(s,n=1,o=12){const t=new URL(`${c}/filters`);return t.searchParams.set("filter",s),t.searchParams.set("page",n),t.searchParams.set("limit",o),(await fetch(t)).json()}async getExercises({bodypart:s,muscles:n,equipment:o,keyword:t,page:a=1,limit:r=10}){const i=new URL(`${c}/exercises`);return s&&i.searchParams.set("bodypart",s),n&&i.searchParams.set("muscles",n),o&&i.searchParams.set("equipment",o),t&&i.searchParams.set("keyword",t),i.searchParams.set("page",a),i.searchParams.set("limit",r),(await fetch(i)).json()}async getExerciseById(s){return(await fetch(`${c}/exercises/${s}`)).json()}async subscribe(s){const n=await fetch(`${c}/subscription`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s})});if(!n.ok)throw new Error("Subscription failed");return n.json()}async patchRating(s,{rate:n,email:o,review:t}){const a=await fetch(`${c}/exercises/${s}/rating`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({rate:Number(n),email:o,review:t})});if(!a.ok){const r=new Error("Rating failed");throw r.response={status:a.status},r}return a.json()}}const A=new $,u=document.querySelector(".js-rating-backdrop"),x=document.querySelector(".js-rating-close"),d=document.querySelector(".js-rating-form"),v=document.querySelector(".js-stars-list"),j=document.querySelector(".js-rating-value");let M=null,m=0;function I(e){if(!u)return;M=e;const s=document.querySelector(".js-backdrop");s&&s.classList.add("is-hidden"),u.classList.remove("is-hidden"),R()}function g(){u.classList.add("is-hidden");const e=document.querySelector(".js-backdrop");e&&!e.classList.contains("is-hidden")&&e.classList.remove("is-hidden")}v&&v.addEventListener("click",e=>{const s=e.target.closest(".star-item");if(!s)return;m=Number(s.dataset.value),j.textContent=m.toFixed(1),v.querySelectorAll(".star-item").forEach((o,t)=>{t<m?o.classList.add("active"):o.classList.remove("active")})});d&&d.addEventListener("submit",async e=>{if(e.preventDefault(),m===0){alert("Please select a rating star!");return}const s=d.elements.email.value.trim(),n=d.elements.comment.value.trim(),o=d.querySelector("button"),t=o.textContent;o.textContent="Sending...",o.disabled=!0;try{await A.patchRating(M,{rate:m,email:s,review:n}),alert("Thank you! Your rating has been accepted."),g()}catch(a){console.error(a),a.response&&a.response.status===409?alert("You have already rated this exercise."):alert("Something went wrong. Please try again."),g()}finally{o.textContent=t,o.disabled=!1}});function R(){d.reset(),m=0,j.textContent="0.0",v.querySelectorAll(".star-item").forEach(e=>e.classList.remove("active"))}x&&x.addEventListener("click",g);u&&u.addEventListener("click",e=>{e.target===u&&g()});const N=new $,l=document.querySelector(".js-backdrop"),h=document.querySelector(".js-modal-content"),E=document.querySelector(".js-modal-close");let p=null;async function U(e){if(l){l.classList.remove("is-hidden"),document.body.style.overflow="hidden",h.innerHTML='<p style="text-align:center; padding:50px;">Loading...</p>';try{p=await N.getExerciseById(e),H(p),F()}catch(s){console.error(s),h.innerHTML='<p style="text-align:center; color:red; padding:50px;">Failed to load details.</p>'}}}function L(){l.classList.add("is-hidden"),document.body.style.overflow="",h.innerHTML=""}E&&E.addEventListener("click",L);l&&l.addEventListener("click",e=>{e.target===l&&L()});document.addEventListener("keydown",e=>{e.key==="Escape"&&!l.classList.contains("is-hidden")&&L()});function H(e){const{gifUrl:s,name:n,rating:o,target:t,bodyPart:a,equipment:r,popularity:i,burnedCalories:w,time:P,description:C,_id:T}=e,S=(JSON.parse(localStorage.getItem("favorites"))||[]).some(O=>O._id===T),B=`
    <div class="modal-wrapper">
      <img class="modal-img" src="${s}" alt="${n}">
      
      <div class="modal-info">
        <h3 class="modal-title">${n}</h3>
        
        <div class="modal-rating">
          <span class="modal-rating-value">${o}</span>
          <svg class="modal-star" viewBox="0 0 32 32"><path d="M16 2 L20.32 10.75 L30 12.16 L23 18.98 L24.65 28.63 L16 24.08 L7.35 28.63 L9 18.98 L2 12.16 L11.68 10.75 Z"></path></svg>
        </div>

        <ul class="modal-details-list">
          <li class="modal-details-item">
            <span class="modal-details-label">Target</span>
            <span class="modal-details-value">${t}</span>
          </li>
          <li class="modal-details-item">
            <span class="modal-details-label">Body Part</span>
            <span class="modal-details-value">${a}</span>
          </li>
          <li class="modal-details-item">
            <span class="modal-details-label">Equipment</span>
            <span class="modal-details-value">${r}</span>
          </li>
          <li class="modal-details-item">
            <span class="modal-details-label">Popular</span>
            <span class="modal-details-value">${i}</span>
          </li>
          <li class="modal-details-item">
            <span class="modal-details-label">Burned Calories</span>
            <span class="modal-details-value">${w}/${P} min</span>
          </li>
        </ul>

        <p class="modal-desc">${C}</p>

        <div class="modal-buttons">
          <button type="button" class="modal-btn-fav js-fav-btn">
            <span>${S?"Remove from favorites":"Add to favorites"}</span>
            ${S?'<svg width="18" height="18"><path d="M6 18L18 6M6 6l12 12" stroke="white" stroke-width="2"/></svg>':'<svg width="18" height="18"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white"/></svg>'}
          </button>
          
          <button type="button" class="modal-btn-rating">
            Give a rating
          </button>
        </div>
      </div>
    </div>
  `;h.innerHTML=B}function F(){const e=document.querySelector(".js-fav-btn"),s=document.querySelector(".modal-btn-rating");e&&e.addEventListener("click",()=>{let n=JSON.parse(localStorage.getItem("favorites"))||[];const o=n.findIndex(t=>t._id===p._id);o===-1?(n.push(p),e.querySelector("span").textContent="Remove from favorites",e.innerHTML='<span>Remove from favorites</span> <svg width="18" height="18"><path d="M6 18L18 6M6 6l12 12" stroke="white" stroke-width="2"/></svg>'):(n.splice(o,1),e.querySelector("span").textContent="Add to favorites",e.innerHTML='<span>Add to favorites</span> <svg width="18" height="18"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white"/></svg>'),localStorage.setItem("favorites",JSON.stringify(n))}),s&&s.addEventListener("click",()=>{L(),I(p._id)})}const y=document.querySelector(".js-open-menu"),k=document.querySelector(".js-close-menu"),b=document.querySelector(".js-menu-container");function q(){const e=y.getAttribute("aria-expanded")==="true"||!1;y.setAttribute("aria-expanded",!e),b.classList.toggle("is-open"),b.classList.contains("is-open")?document.body.style.overflow="hidden":document.body.style.overflow=""}y&&k&&(y.addEventListener("click",q),k.addEventListener("click",q),document.querySelectorAll(".mobile-nav-link").forEach(e=>{e.addEventListener("click",()=>{b.classList.remove("is-open"),document.body.style.overflow=""})}));const f=document.getElementById("scrollToTopBtn");f&&(window.addEventListener("scroll",()=>{window.scrollY>300?f.classList.remove("is-hidden"):f.classList.add("is-hidden")}),f.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}));export{$ as Y,U as o};
//# sourceMappingURL=scroll-up-Bd-b3WRV.js.map
